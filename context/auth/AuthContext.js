import React, { useReducer, useState } from "react";
import { createContext } from "react";
import { authReducer } from "./AuthReducer";
import { useNavigation } from "@react-navigation/native";
import axios from '../../utils/axios';

export const authInitialState = {
  isLoggedIn: false,
  user: undefined,
};


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();

  const [ authState, dispatch ] = useReducer(authReducer, authInitialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const signIn = async (email) =>  {
    setLoading(true);
    try {
      const response = await axios.post('users/searchbyEmail', {email: email})
      if (response.data.status === 200) {
        dispatch({ type: 'signIn', payload: response.data.data[0] });
        navigation.navigate('Root');
      } else {
        //TODO definir interface de error
        setError(true);
      }
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const providerValue = {
    authState,
    error,
    loading,
    signIn: (email) => signIn(email),
    logout: () => {},
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}
