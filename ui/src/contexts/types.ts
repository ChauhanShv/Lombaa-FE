export type Payload = {
    [key: string]: any;
}
export type Action = {
    type: string;
    payload?: Payload;
}
export type Dispatch = (action: Action) => void;

export enum ActionTypes {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    IS_ACTIVE = 'IS_ACTIVE',
    UPDATE_PROFILE = 'UPDATE_PROFILE',
};

export type State = {
    isLoggedIn: boolean;
    user: any,
}
  
export type AppContextProviderProps = {
    children: React.ReactNode
}

