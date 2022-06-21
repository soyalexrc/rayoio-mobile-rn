import {useState} from 'react';
import axios from "../utils/axios";
import {useDispatch, useSelector} from "../redux/store";
import {selectOrder, addOrderPicked} from '../redux/slices/orders';
import {cloneDeep} from 'lodash';
import orderStatus from '../utils/orderStatus';

export default function useVerifyProductExist() {
  const selectedOrder = useSelector(state => state.orders.selectedOrder)
  const dispatch = useDispatch()
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function consult(data) {

    const copyOrderItems = cloneDeep(selectedOrder.items).filter(x => x.code === data.code)

    if (copyOrderItems.length > 0) {
      try {
        setLoading(true)
        const response = await axios.post('items/ItemByCode', data)

        if (response.data.status === (200 || 204)) {
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
            } else if (response.data.status === 204) {
              setData({message: 'Se pickeo el producto!, pero no existe en el inventario...', status: 404})
            }
            dispatch(selectOrder({...selectedOrder, items: arrayMatch}))
            dispatch(addOrderPicked(1))
          } else {
            setData({message: 'Este producto ya se encuentra completamente cargado en la orden.', status: 404})
          }

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

  async function changeStatusOrder(data) {
    const copyOrder = cloneDeep(selectedOrder);
    try {
      setLoading(true)
      const response = await axios.put('orders/byStatus', data);
      if (response.data.status === 201) {
        if (data.idStatus === orderStatus.assigned) {
          dispatch(selectOrder({...copyOrder, ff_statusOrder: orderStatus.picking}))
        }
        if (data.idStatus === orderStatus.picking) {
          dispatch(selectOrder({...copyOrder, ff_statusOrder: orderStatus.picked}))
        }
        setData({message: response.data.message, status: 200})
      }
      setLoading(false)
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  return {
    data,
    consultItem: (addBody) => consult(addBody),
    changeStatus: (statusData) => changeStatusOrder(statusData),
    loading,
    error
  };
}
