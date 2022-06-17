import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  clients: [],
  selectedClient: {},
};

const slice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET QUESTIONS
    getClientsDataSuccess(state, action) {
      state.isLoading = false;
      state.clients = action.payload;
    },

    setSelectedClient(state, action) {
      state.selectedClient = action.payload;
    }
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getClients() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("clients");
      dispatch(slice.actions.getClientsDataSuccess(response.data?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function selectClient(client) {
  return (dispatch) => {
    dispatch(slice.actions.setSelectedClient(client))
  }
}
