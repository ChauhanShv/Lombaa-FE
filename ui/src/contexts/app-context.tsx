import * as React from 'react';
import {
  Action,
  Dispatch,
  ActionTypes,
  AppContextProviderProps,
  State
} from './types';

const AppContext = React.createContext<
  {state: State; dispatch: Dispatch} | undefined
>(undefined);

function appReducer(state: State, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        user: payload?.user,
        token: payload?.token,
        isLoggedIn: true,
      }
    case ActionTypes.IS_ACTIVE:
      return {
        ...state,
        user: { ...payload?.user },
      }      
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const isLoggedIn: boolean = !!localStorage.getItem('token');
  const [state, dispatch] = React.useReducer(appReducer, { isLoggedIn });
  const value = { state, dispatch };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

function useAppContext() {
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider')
  }
  return context
}

export { AppContextProvider, useAppContext }