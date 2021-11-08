import {
    Action,
    ActionTypes,
    Session
} from '../types';

export const sessionReducer = (state: Session, action: Action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                token: payload?.token,
            }
        case ActionTypes.LOGOUT:
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