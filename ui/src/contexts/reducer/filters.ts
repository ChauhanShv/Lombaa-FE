import { Action, ActionTypes } from '../types';

export const filtersReducer = (state: any, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.PRODUCT_FILTERS:
      return payload?.filters;
    default:
      return state;
  }
};
