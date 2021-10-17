import * as React from 'react';
import { Action, Dispatch, ActionTypes } from './types';

type State = {
  user: string;
}

type AppContextProviderProps = {
  children: React.ReactNode
}

const AppContext = React.createContext<
  {state: State; dispatch: Dispatch} | undefined
>(undefined)

function appReducer(state: State, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        user: payload?.user,
      }
      
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: '',
      }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = React.useReducer(appReducer, { user: '' })
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