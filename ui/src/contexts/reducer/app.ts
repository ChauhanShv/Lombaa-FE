import {
    Action,
    ActionTypes,
    App
} from '../types';
import { omit } from 'lodash';

export const appReducer = (state: App, action: Action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.APP_READY:
            return {
                ...state,
                appReady: true,
            }
        case ActionTypes.OPEN_MODAL:
            return {
                ...state,
                activeModal: payload?.modal,
            }
        case ActionTypes.CLOSE_MODAL:
            const newState = omit(state, ['activeModal']);
            return {
                ...newState
            }
        default: {
            return state;
        }
    }
};