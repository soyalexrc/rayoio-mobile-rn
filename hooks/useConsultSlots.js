import {useState, useEffect} from 'react';
import axios from "../utils/axios";

export default function useConsultSlots() {
  const [orderSlotsData, setOrderSlotsData] = useState([]);
  const [orderSlotsLoading, setOrderSlotsLoading] = useState(false);
  const [orderSlotsError, setOrderSlotsError] = useState(null);
  const [indicator, setIndicator] = useState(null);

  async function fetchData(bodyData) {
    try {
      setOrderSlotsLoading(true)
      const response = await axios.post('orders/checkOrderInventory', bodyData);
      setOrderSlotsData(response.data.data);
      setIndicator(response.data.indicarOptimizador)
      setOrderSlotsLoading(false)

    } catch(err) {
      setOrderSlotsLoading(false)
      setOrderSlotsError(err)
    }
  }

  return {orderSlotsData, orderSlotsError, orderSlotsLoading, indicator, getSlotsOrder: (data) => fetchData(data)};
}
