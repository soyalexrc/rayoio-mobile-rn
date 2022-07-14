export const scannerReducer = (state , action)  => {
  switch (action.type) {
    case 'addItem':
      return {
        ...state,
        recentScannedItems: [...state.recentScannedItems, action.payload],
      };
    default:
      return state;
  }
};
