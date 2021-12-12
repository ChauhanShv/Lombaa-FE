import {
    Action,
    ActionTypes,
    Session
} from '../types';

export const sessionReducer = (state: Session, action: Action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.LOGIN:
            localStorage.setItem("token", payload?.token);
            return {
                ...state,
                isLoggedIn: true,
                token: payload?.token,
            }
        case ActionTypes.LOGOUT:
            localStorage.setItem("token", "");
            return {
                ...state,
                isLoggedIn: false,
                token: '',
            }
        default: {
            return state;
        }
    }
};