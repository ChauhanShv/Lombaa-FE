import { State } from ".";

export const initialState: State = {
    session: {
        lat: '',
        lng: '',
    },
    user: {},
    app: {
        appReady: false,
    },
    category: []
};