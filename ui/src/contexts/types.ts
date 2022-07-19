import { KeyValuePair, ModalType, Country } from '../types';

export type Action = {
  type: string;
  payload?: KeyValuePair;
};
export type Dispatch = (action: Action) => void;

export enum ActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  APP_READY = 'APP_READY',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  CATEGORIES = 'CATEGORIES',
  SINGLECATEGORY = 'SINGLECATEGORY',
  SETLATLNG = 'SETLATLNG',
  PRODUCT_FILTERS = 'PRODUCT_FILTERS',
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
}

export type AppContextProviderProps = {
  children: React.ReactNode;
};

export interface App {
  appReady?: boolean;
  activeModal?: ModalType;
}

export interface Session {
  isLoggedIn?: boolean;
  token?: string;
  lat: string;
  lng: string;
  country: Country;
}
export interface User {
  metaData?: KeyValuePair;
}
export type State = {
  session: Session;
  user: User;
  app: App;
  category: [];
  filters: [];
}
