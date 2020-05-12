import React, { createContext, useReducer } from "react";

let initialState = {};
if (localStorage.getItem("auth_token")) initialState = { auth: true };

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "authenticated":
        return { auth: true };
      case "not authenticated":
        return { auth: false };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
