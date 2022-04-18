import * as React from 'react';
import {
  Dispatch,
  AppContextProviderProps,
  State,
} from './types';
import {
  sessionReducer as session,
  userReducer as user,
  appReducer as app,
  categoryReducer as category,
  filtersReducer as filters,
} from './reducer';
import { combineReducers } from './utils';
import { initialState } from './initial-state';

const rootReducer = combineReducers({
  session,
  user,
  app,
  category,
  filters,
});
const AppContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);
const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = React.useReducer(rootReducer, initialState);
  const value = { state, dispatch };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
const useAppContext = () => {
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider')
  }
  return context
}
export { AppContextProvider, useAppContext }