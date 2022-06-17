import {useState} from 'react';
import axios from "../utils/axios";

export default function useReadProduct() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function addData(data) {
    console.log(data);
    try {
      setLoading(true)
      const response = await axios.post('slots/addItemSlot', data)
      setData(response.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(err)
    }
  }
  async function removeData(data) {
    console.log(data);
    try {
      setLoading(true)
      const response = await axios.post('slots/substractItemSlot', data)
      setData(response.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(err)
    }
  }

  return {data, cleanData: () => setData({}), addItem: (addBody) => addData(addBody), removeItem: (removeBody) => removeData(removeBody), loading, error};
}
