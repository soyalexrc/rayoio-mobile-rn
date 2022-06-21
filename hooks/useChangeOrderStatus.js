import {useState, useEffect} from 'react';
import {cloneDeep} from "lodash";
import axios from "../utils/axios";
import orderStatus from "../utils/orderStatus";
import {selectOrder} from '../redux/slices/orders';
import {useDispatch, useSelector} from "../redux/store";

export default function useChangeOrderStatus(fn) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const selectedOrder = useSelector(state => state.orders.selectedOrder)
  const dispatch = useDispatch()

  async function changeStatus(data) {
    console.log(data);
    const copyOrder = cloneDeep(selectedOrder);
    try {
      setIsLoading(true)
      const response = await axios.put('orders/byStatus', data);
      if (response.data.status === 201) {
        await dispatch(selectOrder({...copyOrder, ff_statusOrder: orderStatus.picking}))
        await fn()
        // setData({message: response.data.message, status: 200})
      }
      setIsLoading(false)
    } catch (err) {
      setError(err)
      setIsLoading(false)
    }
  }

  return {isLoading, error, handleChangeStatus: (data) => changeStatus(data)};
}
