import React, { useReducer, useState } from "react";
import { createContext } from "react";
import {stepperReducer} from "./StepperReducer";


export const StepperInitialState = {
  step: 0,
  typeRegister: '',
};


export const StepperContext = createContext({});

export const StepperProvider = ({ children }) => {

  const [ steps, dispatch ] = useReducer(stepperReducer, StepperInitialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function nextStep() {
    if (steps.step < 3 ) {
      dispatch({ type: 'nextStep' })
    }
  }
  function prevStep() {
    if (steps.step >= 1 ) {
      dispatch({ type: 'prevStep' })
    }
  }

  const providerValue = {
    steps,
    nextStep,
    prevStep,
  };

  return (
    <StepperContext.Provider value={providerValue}>
      {children}
    </StepperContext.Provider>
  )
}
