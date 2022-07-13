export const clientsReducer = (state, action) => {
  switch (action.type) {
    case 'getClients':
      return {
        ...state,
        clients: action.payload,
      };

    case 'selectClient':
      return {
        ...state,
        selectedClient: action.payload,
      };

    default:
      return state;
  }
};
