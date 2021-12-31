export interface Icon {
  id: string;
  url: string;
}
export interface FieldValues {
  id: string;
  value: string;
  icon: Icon;
}
export interface Fields {
  dataTypes: string;
  fieldType: string;
  id: string;
  isActive: number;
  isRequired: boolean;
  label: string;
  sortOrder?: string;
  values: FieldValues[];
}
export interface SubCategories {
  id: string;
  name: string;
  description: string;
  fields: Fields[];
  isActive: number;
  isPopular: number;
}
export interface Categories {
  id: string;
  name: string;
  description: string;
  fields: Fields[];
  isActive: number;
  isPopular: number;
  subCategories: SubCategories[];
}

export interface Media {
  token: string;
  url: string;
  mime: string;
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
