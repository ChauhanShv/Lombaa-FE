
import { Categories } from '../../components/create-post/types';
import { Action, ActionTypes } from '../types';

export const categoryReducer = (state: Categories, action: Action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.CATEGORIES:
            return payload?.category
        default: {
            return state;
        }

    }


};