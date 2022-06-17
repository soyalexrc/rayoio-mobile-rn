import {useState} from 'react';
import axios from "../utils/axios";

export default function useGetInventory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function consultData(data) {
    try {
      setLoading(true)
      const response = await axios.post('slots/getInventoryByCode', data)
      console.log(response.data.data);
      setData(response.data.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(err)
    }
  }

  return {data, getItemInventory: (body) => consultData(body), loading, error};
}
