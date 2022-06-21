import {useState} from 'react';
import axios from "../utils/axios";

export default function useGetOrders() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function consultData(data) {
    console.log('data', data);
    try {
      setLoading(true)
      const response = await axios.post('orders/byUserWarehouse', data)
      setData(response.data.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(err)
    }
  }

  return {data, getOrders: (body) => consultData(body), loading, error};
}

