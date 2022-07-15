export const fulfillmentReducer = (state, action) => {
  switch (action.type) {
    case 'getOrders':
      return {
        ...state,
        orders: action.payload,
      };

    case 'selectOrder':
      return {
        ...state,
        selectedOrder: action.payload,
      };

    default:
      return state;
  }
};
