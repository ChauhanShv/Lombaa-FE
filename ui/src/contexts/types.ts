export type KeyValuePair = {
    [key: string]: any;
}
export type Action = {
    type: string;
    payload?: KeyValuePair;
}
export type Dispatch = (action: Action) => void;

export enum ActionTypes {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    APP_READY = 'APP_READY',
    UPDATE_PROFILE = 'UPDATE_PROFILE',
};  
export type AppContextProviderProps = {
    children: React.ReactNode
}

export interface App {
    appReady?: boolean;
};
export interface Session {
    isLoggedIn?: boolean;
    token?: string;
};
export interface User {
    metaData?: KeyValuePair;
};
export type State = {
    session: Session;
    user: User;
    app: App;
};

