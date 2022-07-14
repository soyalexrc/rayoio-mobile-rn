import {useState, useEffect} from 'react';
import axios from "../utils/axios";

export default function useGetClients() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await axios.get('/clients');
      setData(response.data.data);
      setLoading(false);
    } catch (e) {
      setLoading(false)
      setError(e)
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return {data, loading, error};
}
