import React, {createContext, useContext, useReducer} from "react"

//Similar to a Redux data layer when accessing the redux store
export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, children}) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//useStateValue is how you get data to other components from this dataLayer
export const useStateValue = () => useContext(StateContext)