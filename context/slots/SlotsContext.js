import React, { useReducer, useState } from "react";
import { createContext } from "react";
import axios from '../../utils/axios';
import { slotsReducer } from "./SlotsReducer";


export const slotsInitialState = {
  slots: [],
  selectedSlot: {},
};


export const SlotsContext = createContext({});

export const SlotsProvider = ({ children }) => {

  const [ slots, dispatch ] = useReducer(slotsReducer, slotsInitialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getSlots = async (data) =>  {
    setLoading(true);
    try {
      const response = await axios.post('slots/getSlotByWarehouse', data );
      if (response.data.status === 200) {
        dispatch({ type: 'getSlots', payload: response.data.data });
      }
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const selectSlot = (client) => {
    dispatch({ type: 'selectSlot', payload: client });
  };

  const providerValue = {
    slots,
    loading,
    error,
    getSlots,
    selectSlot,
  };

  return (
    <SlotsContext.Provider value={providerValue}>
      {children}
    </SlotsContext.Provider>
  )
}
