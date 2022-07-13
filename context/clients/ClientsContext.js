import React, { useReducer, useState } from "react";
import { createContext } from "react";
import axios from '../../utils/axios';
import { clientsReducer } from "./ClientsReducer";



export const clientsInitialState = {
  clients: [],
  selectedClient: {}
};
export const ClientsContext = createContext({});

export const ClientsProvider = ({ children }) => {

  const [ clients, dispatch ] = useReducer(clientsReducer, clientsInitialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getClients = async () =>  {
    setLoading(true);
    try {
      const response = await axios.get('clients');
      if (response.data.status === 200) {
        dispatch({ type: 'getClients', payload: response.data.data });
      }
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const selectClient = (client) => {
    dispatch({ type: 'selectClient', payload: client });
  };

  const providerValue = {
    clients,
    loading,
    error,
    getClients,
    selectClient,
  };

  return (
    <ClientsContext.Provider value={providerValue}>
      {children}
    </ClientsContext.Provider>
  )
}
