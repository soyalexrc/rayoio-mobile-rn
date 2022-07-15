export const scannerReducer = (state , action)  => {
  switch (action.type) {
    case 'addItem':
      return {
        ...state,
        recentScannedItems: [...state.recentScannedItems, action.payload],
      };
    case 'removeFromList':
      const elementsInList = [...state.recentScannedItems];
      console.log(elementsInList);
      const indexElementToRemove = elementsInList.findIndex(element => element._id === action.payload);
      console.log(indexElementToRemove);
      elementsInList.splice(indexElementToRemove, 1);
      return {
        ...state,
        recentScannedItems: elementsInList
      };
    case 'cleanList':
      return {
        ...state,
        recentScannedItems: []
      };
    default:
      return state;
  }
};
