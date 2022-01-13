export interface Product {
  id: string;
  slug: string;
  approvedAt: string;
  postedAt: string;
  soldAt?: string;
  rejectedAt?: string;
  rejectReason?: string;
  expiry: string;
  categoryId: string;
  locationId: string;
  userId: string;
  location: Location;
  productFields: ProductFields[];
  user: {
    name: string;
  };
  title: string;
}
export interface Location {
  id?: string;
  city: City;
  region: Region;
  country: Country;
}
export interface City {
  id?: string;
  name?: string;
  code?: string;
  coordinate?: object;
}
export interface Region {
  id?: string;
  name?: string;
  code?: string;
  coordinate?: object;
}
export interface Country {
  id?: string;
  name?: string;
  code?: string;
  coordinate?: object;
  phoneCode?: string | number;
}
export interface ProductFields {
  id?: string;
  key?: string;
  value?: string;
  field: Field;
}
export interface Field {
  id?: string;
  label?: string;
  isRequired?: boolean;
  isActive?: number | boolean;
  dataTypes: string;
  fieldTypes: string;
  values: FieldValue[];
}
export interface FieldValue {
  id?: string;
  value?: string;
  sort?: number;
  icon: {
    id?: string;
    url?: string;
    mime?: string;
    extension?: string;
  };
}
