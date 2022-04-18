import { Action, ActionTypes } from '../types';
import { Category } from '../../types';

export const categoryReducer = (state: Category, action: Action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.CATEGORIES:
            return payload?.category;
        default: {
            return state;
        }
    }
};
