
import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  items: [1,2,3,4],
};

const slice = createSlice({
  name: "scannedItems",
  initialState,
  reducers: {
    sumScannedItem(state, action) {
      state.items = [...state.items, action.payload];
    }
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function addScannedItem(item) {
  return (dispatch) => {
    dispatch(slice.actions.sumScannedItem(item))
  }
}
