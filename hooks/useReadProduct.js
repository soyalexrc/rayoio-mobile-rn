import {useState} from 'react';
import axios from "../utils/axios";
import {useDispatch, useSelector} from "../redux/store";
import {selectSlot} from '../redux/slices/slots'

export default function useReadProduct() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  const selectedSlot = useSelector(state => state.slots.selectedSlot)

  async function addData(data) {
    try {
      setLoading(true)
      const response = await axios.post('slots/addItemSlot', data)
      if (response.data.status === 201) {
        dispatch(selectSlot({ ...selectedSlot, amount: selectedSlot.amount + 1 }))
      }
      setData(response.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(err)
    }
  }
  async function removeData(data) {
    try {
      setLoading(true)
      const response = await axios.post('slots/substractItemSlot', data)
      if (response.data.status === 201) {
        dispatch(selectSlot({ ...selectedSlot, amount: selectedSlot.amount - 1 }))
      }
      setData(response.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(err)
    }
  }

  return {data, addItem: (addBody) => addData(addBody), removeItem: (removeBody) => removeData(removeBody), loading, error};
}
