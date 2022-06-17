import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  slots: [],
  selectedSlot: {},
};

const slice = createSlice({
  name: "slots",
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
    getSlotsDataSuccess(state, action) {
      state.isLoading = false;
      state.slots = action.payload;
    },

    setSelectedSlot(state, action) {
      state.selectedSlot = action.payload;
    }
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getSlotsByWarehouse(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("slots/getSlotByWarehouse", data);
      dispatch(slice.actions.getSlotsDataSuccess(response.data?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function selectSlot(slot) {
  return (dispatch) => {
    dispatch(slice.actions.setSelectedSlot(slot))
  }
}
