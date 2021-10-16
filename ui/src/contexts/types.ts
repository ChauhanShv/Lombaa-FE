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
};

