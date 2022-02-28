import { State } from '.';
import { CURRENT_COUNTRY } from '../config';

export const initialState: State = {
  session: {
    lat: '',
    lng: '',
    country: {
      code: CURRENT_COUNTRY,
    }
  },
  user: {},
  app: {
    appReady: false,
  },
  category: [],
  filters: [],
};
