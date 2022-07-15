import React, { useReducer, useState } from "react";
import { createContext } from "react";
import axios from '../../utils/axios';
import {scannerReducer} from "./ScannerReducer";


export const slotsInitialState = {
  recentScannedItems: [],
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

  const cleanList = () => {
    dispatch({type: 'cleanList'})
  }

  const scanItem = async () =>  {
    const newItem = {
      image: '../../assets/images/no-imagepng.png',
      title: 'sample item' + Math.floor(Math.random() * 10),
      units: 1,
      _id: new Date().valueOf()
    };
    setSnackbar({open: false, text: '', type: ''})
    await sleep(2000);
    setSnackbar({open: true, text: 'OK', type: 'success'})
    setTimeout(() => { setSnackbar({open: false, text: '', type: ''})}, 1500)
    dispatch({ type: 'addItem', payload: newItem})
  };

  const removeItemFromList = (id) => {
    dispatch({ type: 'removeFromList', payload: id })
  }

  const scanItemIntoSlot = async (data) => {
    const newItem = {
      image: '../../assets/images/no-imagepng.png',
      title: 'sample item' + Math.floor(Math.random() * 10),
      units: 1,
      _id: new Date().valueOf()
    };
    try {
      setSnackbar({open: false, text: '', type: ''})
      setLoading(true)
      const response = await axios.post('slots/addItemSlot', data)
      if (response.data.status === 201) {
        setSnackbar({open: true, text: response.data.message, type: 'success'})
        dispatch({type: 'addItem', payload: newItem});
      } else {
        setSnackbar({open: true, text: response.data.message, type: 'error'})
      }
    } catch (err) {
      setSnackbar({open: true, text: 'No OK', type: 'success'})
      setError(err)
    } finally {
      setTimeout(() => { setSnackbar({open: false, text: '', type: ''})}, 1500)
      setLoading(false);
    }
  }

  const removeItemFromSlot = async (data) =>  {
    const newItem = {
      image: '../../assets/images/no-imagepng.png',
      title: 'sample item' + Math.floor(Math.random() * 10),
      units: 1,
      _id: new Date().valueOf()
    };
    try {
      setSnackbar({open: false, text: '', type: ''})
      setLoading(true)
      const response = await axios.post('slots/substractItemSlot', data)
      console.log(response.data);
      if (response.data.status === 201) {
        setSnackbar({open: true, text: response.data.message, type: 'success'})
        dispatch({type: 'addItem', payload: newItem});
      }
    } catch (err) {
      setSnackbar({open: true, text: 'No OK', type: 'success'})
      setError(err)
    } finally {
      setTimeout(() => { setSnackbar({open: false, text: '', type: ''})}, 2000)
      setLoading(false);
    }
  }


  const providerValue = {
    items,
    loading,
    error,
    snackbar,
    scanItem,
    removeItemFromList,
    scanItemIntoSlot,
    removeItemFromSlot,
    cleanList
  };

  return (
    <ScannerContext.Provider value={providerValue}>
      {children}
    </ScannerContext.Provider>
  )
}
