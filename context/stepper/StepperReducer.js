export const stepperReducer = (state , action)  => {
  switch (action.type) {
    case 'nextStep':
      return {
        ...state,
        step: state.step + 1,
      };

    case 'prevStep':
      return {
        ...state,
        step: state.step - 1,
      };
    default:
      return state;
  }
};
