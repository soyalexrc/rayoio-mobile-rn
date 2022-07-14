import React, { useReducer, useState } from "react";
import { createContext } from "react";
import axios from '../../utils/axios';
import {scannerReducer} from "./ScannerReducer";


export const slotsInitialState = {
  recentScannedItems: [
    {
      image: '../../assets/images/no-imagepng.png',
      title: 'sample item',
      units: 1,
      _id: 1234
    },
  ],
};


export const ScannerContext = createContext({});

export const ScannerProvider = ({ children }) => {

  const [ items, dispatch ] = useReducer(scannerReducer, slotsInitialState);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    text: '',
    type: ''
  })
  const [error, setError] = useState(false);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(() => resolve, ms))
  }

  const scanItem = async (data) =>  {
    const newItem = {
      image: '../../assets/images/no-imagepng.png',
      title: 'sample item' + Math.floor(Math.random() * 10),
      units: 1,
      _id: Math.floor(Math.random() * 100)
    };
    setSnackbar({open: false, text: '', type: ''})
    sleep(2000);
    setSnackbar({open: true, text: 'OK', type: 'success'})
    setTimeout(() => { setSnackbar({open: false, text: '', type: ''})}, 2000)
    dispatch({ type: 'addItem', payload: newItem})
  };

  async function scanItemIntoSlot(data) {
    try {
      setSnackbar({open: false, text: '', type: ''})
      setLoading(true)
      const response = await axios.post('slots/addItemSlot', data)
      if (response.data.status === 201) {
        // dispatch(selectSlot({ ...selectedSlot, amount: selectedSlot.amount + 1 }))
        setSnackbar({open: true, text: 'OK', type: 'success'})
        setTimeout(() => { setSnackbar({open: false, text: '', type: ''})}, 2000)
      }
      // setData(response.data)
      setLoading(false)
    } catch (err) {
      setSnackbar({open: true, text: 'No OK', type: 'success'})
      setTimeout(() => { setSnackbar({open: false, text: '', type: ''})}, 2000)
      setLoading(false)
      setError(err)
    }
  }

  async function removeItemFromSlot(data) {
    try {
      setSnackbar({open: false, text: '', type: ''})
      setLoading(true)
      const response = await axios.post('slots/substractItemSlot', data)
      if (response.data.status === 201) {
        // dispatch(selectSlot({ ...selectedSlot, amount: selectedSlot.amount - 1 }))
        setSnackbar({open: true, text: 'OK', type: 'success'})
        setTimeout(() => { setSnackbar({open: false, text: '', type: ''})}, 2000)
      }
      // setData(response.data)
      setLoading(false)
    } catch (err) {
      setSnackbar({open: true, text: 'No OK', type: 'success'})
      setTimeout(() => { setSnackbar({open: false, text: '', type: ''})}, 2000)
      setLoading(false)
      setError(err)
    }
  }


  const providerValue = {
    items,
    loading,
    error,
    snackbar,
    scanItem,
  };

  return (
    <ScannerContext.Provider value={providerValue}>
      {children}
    </ScannerContext.Provider>
  )
}
