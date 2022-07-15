import React, { useReducer, useState } from "react";
import { createContext } from "react";
import axios from '../../utils/axios';
import {fulfillmentReducer} from "./FulfillmentReducer";



export const fulfillmentInitialState = {
  orders: [],
  selectedOrder: {}
};

export const FulfillmentContext = createContext({});

export const FulfillmentProvider = ({ children }) => {

  const [ orders, dispatch ] = useReducer(fulfillmentReducer, fulfillmentInitialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getOrders = async (data) =>  {
      setLoading(true)
    try {
      const response = await axios.post('orders/byUserWarehouse', data)
      if (response.data.status === 200) {
        dispatch({type: 'getOrders', payload: response.data.data})
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false);
    }
  };

  const selectOrder = (order) => {
    dispatch({ type: 'selectOrder', payload: order });
  };

  const providerValue = {
    orders,
    loading,
    error,
    getOrders,
    selectOrder,
  };

  return (
    <FulfillmentContext.Provider value={providerValue}>
      {children}
    </FulfillmentContext.Provider>
  )
}
