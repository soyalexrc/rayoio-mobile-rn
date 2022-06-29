import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from "../../utils/axios";
import * as SecureStore from 'expo-secure-store';


// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  loginData: {},
};

const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getLoginDataSuccess(state, action) {
      state.isLoading = false;
      state.loginData = action.payload;
    },
  },
});

export default slice.reducer;

// ----------------------------------------------------------------------

export function loginWithEmail(loginData) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("users/searchbyEmail", loginData);
      console.log('response', response.data);
      console.log(response.data);
      await dispatch(slice.actions.getLoginDataSuccess(response.data));
      // await SecureStore.setItemAsync('storedLoginData', JSON.stringify(response.data))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setHardLoginData(loginData) {
    console.log('inside hardLoginData ', loginData.data)
  return (dispatch) => {
      dispatch(slice.actions.getLoginDataSuccess(loginData.data))
  };
}
