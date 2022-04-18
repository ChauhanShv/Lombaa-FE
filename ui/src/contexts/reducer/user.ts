import {
    Action,
    ActionTypes,
    User,
} from '../types';

export const userReducer = (state: User, action: Action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.LOGIN:
            return {
                ...state,
                metaData: payload?.metaData,
            }
        case ActionTypes.LOGOUT:
            return {
                ...state,
                metaData: {},
            }
        case ActionTypes.UPDATE_PROFILE:
            return {
                ...state,
                metaData: payload?.metaData,
            }
        default: {
            return state;
        }
    }
};