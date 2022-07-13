export const slotsReducer = (state , action)  => {
  switch (action.type) {
    case 'getSlots':
      return {
        ...state,
        slots: action.payload,
      };

    case 'selectSlot':
      return {
        ...state,
        selectedSlot: action.payload,
      };

    default:
      return state;
  }
};
