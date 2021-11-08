import { State, Action } from './types';

export const combineReducers = (slices: any) => (state: State, action: Action) => {
    return Object.keys(slices).reduce(
        (acc, prop) => ({
            ...acc,
            // @ts-ignore
            [prop]: slices[prop](acc[prop], action),
        }),
        state
    );
}