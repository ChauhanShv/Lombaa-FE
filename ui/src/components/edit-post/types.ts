import { ProductDetail } from "../product-detail/types";

export interface DragAndDropProps {
  updateMedia: (media: Media[]) => void;
  productDetail: ProductDetail;
}
export interface LocationSelectorProps {
  onCitySelected: (data: object) => void;
  defaultValue?: string;
}
export interface ListingTileProps {
  title: string,
  description: string,
  file: any,
  media: Media[],
};

export interface EditFormFieldsProps {
  fields: any;
  fieldValues: FieldValues[];
}
export interface FieldValues {
  fieldValue?: FieldValue;
  field: Field;
  key?: string;
  value: string;
  id: string;
}
export interface Field {
  dataTypes: string;
  fieldType: string;
  id: string;
  isActive: number;
  isRequired: boolean;
  label: string;
  tag?: string;
  values: FieldValue[];
}
export interface FieldValue {
  icon: {
      mime: string;
      extension: string;
      url: string;
  },
  id: string;
  sort: number;
  value: string;
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
  regions: Region[];
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
export interface Media {
  token: string;
  url: string;
  mime: string;
  isPrimary?: boolean;
}
  