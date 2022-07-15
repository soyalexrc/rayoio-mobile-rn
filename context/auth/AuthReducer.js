export const authReducer = (state, action) => {
  switch (action.type) {
    case 'signIn':
      return {
        ...state,
        isLoggedIn: true,
        user: {
          idWarehouse: action.payload.idWarehouse,
          tenant: action.payload.tenant,
          _id: action.payload._id,
          email: action.payload.email,
          nameWarehouse: action.payload.nameWarehouse,
          rol: action.payload.rol,
        },
      };
    case 'logout':
      return {
        ...state,
        isLoggedIn: false,
        user: {}
      }

    default:
      return state;
  }
};
