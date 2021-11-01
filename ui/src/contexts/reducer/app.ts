import {
    Action,
    ActionTypes,
    App
} from '../types';

export const appReducer = (state: App, action: Action) => {
    const { type } = action;
    switch (type) {
        case ActionTypes.APP_READY:
            return {
                ...state,
                appReady: true,
            }
        default: {
            return state;
        }
    }
};