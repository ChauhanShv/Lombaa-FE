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

export interface Region {
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
