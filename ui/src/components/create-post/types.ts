export interface Media {
  token: string;
  url: string;
  mime: string;
  isPrimary?: boolean;
}

export interface LocationSelectorProps {
  onCitySelected: (data: object) => void;
  isSettingsPage: boolean;
}

export interface Country {
  id: string;
  name: string;
  code: string;
  coordinate: {
    type: string;
    coordinates: number[];
  };
  phoneCode: string;
  currencySymbol: string;
  currencyCode: string;
}

export interface Region {
  country: Country;
  cities: Array<City>;
  code: string;
  coordinate?: object;
  id: string;
  name: string;
}

export interface City {
  code: string;
  coordinate?: object;
  id: string;
  name: string;
}
export interface DragAndDropProps {
  updateMedia: (media: Media[]) => void;
}
