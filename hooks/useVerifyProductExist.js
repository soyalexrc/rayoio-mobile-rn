import {useState} from 'react';
import axios from "../utils/axios";
import {useDispatch, useSelector} from "../redux/store";
import {selectOrder, addOrderPicked} from '../redux/slices/orders';
import {cloneDeep} from 'lodash';

export default function useVerifyProductExist() {
  const selectedOrder = useSelector(state => state.orders.selectedOrder)
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()

  async function consult(data) {

    const copyOrderItems = cloneDeep(selectedOrder.items).filter(x => x.code === data.code)

    if (copyOrderItems.length > 0) {
      try {
        setLoading(true)
        const response = await axios.post('items/ItemByCode', data)

        if (response.data.status === (200 || 204 )) {
          let statusChanged = false;
          let arrayMatch = cloneDeep(selectedOrder.items).map((i, index) => {
            let item = i;
            try {
              if (item.code === data.code && item.status === "pending" && statusChanged === false) {
                item.status = "picked";
                item.amountpicked = 1
                statusChanged = true;
              }
            } catch (e) {
              console.log(e)
            }
            return item;
          })
          if (statusChanged) {
            if (response.data.status === 200) {
              setData({message: 'Se pickeo el producto!', status: 200})
            }  else if (response.data.status === 204) {
              setData({message: 'Se pickeo el producto!, pero no existe en el inventario...', status: 404})
            }
            dispatch(selectOrder({...selectedOrder, items: arrayMatch}))
            dispatch(addOrderPicked(1))
          } else {
            setData({message: 'Este producto ya se encuentra completamente cargado en la orden.', status: 404})
          }

          // setData({message: 'Se pickeo el producto!', status: 200})
          // if (arrayMatch.length > 0) {
          //   if (arrayMatch.filter(x => x.status === 'pending').length > 0) {
          //     setElement({...arrayMatch[0], status: 'picking', amountpicked: 1})
          //     const newArray = arrayMatch.splice(0, 1, element)
          //     dispatch(selectOrder({...selectedOrder, items: newArray}))
          //     setData({message: 'Se pickeo el producto!', status: 200})
          //   } else {
          //     setData({message: 'Este producto ya se encuentra completamente cargado en la orden.', status: 404})
          //   }
          //   setData({message: JSON.stringify(element), status: 200})
          // } else {
          //   setData({status: 500, message: 'Este producto no pertenece a esta orden!'})
          // }

        } else {
          setData({status: 404, message: 'Este producto no existe en el inventario!'})
        }
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError(err)
      }
    } else {
      setData({message: 'Este producto no pertenece a este pedido', status: 500})
    }
  }

  return {data, consultItem: (addBody) => consult(addBody), loading, error};
}
