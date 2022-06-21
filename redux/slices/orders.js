import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  order: [],
  selectedOrder: {},
  currentAmountPicked: 0,
};

const slice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // START LOADING
    // startLoading(state) {
    //   state.isLoading = true;
    // },

    // HAS ERROR
    // hasError(state, action) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },

    // GET QUESTIONS
    // getClientsDataSuccess(state, action) {
    //   state.isLoading = false;
    //   state.clients = action.payload;
    // },

    setSelectedOrder(state, action) {
      state.selectedOrder = action.payload;
    },
    setAmountPicked(state, action) {
      state.currentAmountPicked =  state.currentAmountPicked + action.payload;
    }
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function selectOrder(order) {
  return (dispatch) => {
    dispatch(slice.actions.setSelectedOrder(order))
  }
}

export function addOrderPicked(order) {
  return (dispatch) => {
    dispatch(slice.actions.setAmountPicked(order))
  }
}
