export interface ProductFilterProps {
  categoryId: string;
  sort?: string;
  onFilterChange: (filter: string) => void;
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
  currencyCode?: string;
  currencySymbol?: string;
}
export interface Location {
  id?: string;
  city: City;
  region: Region;
  country: Country;
}
export interface ProductMediaFile {
  id: string;
  url: string;
  mime: string;
  extension: string;
}
export interface ProductMedia {
  id: string;
  isPrimary: boolean;
  fileId: string;
  productId: string;
  file: ProductMediaFile;
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
  }
}
export interface Field {
  id?: string;
  label?: string;
  isRequired?: boolean;
  isActive?: number | boolean;
  dataTypes: string;
  fieldType: string;
  values: FieldValue[];
}
export interface ProductFields {
  id?: string;
  key?: string;
  value?: string;
  field: Field;
}
export interface ProfilePicture {
  id: string;
  url: string;
  mime: string;
  extension: string;
}
export interface User {
  name: string;
  profilePictureId: string;
  profilePicture: ProfilePicture;
}
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
  productMedia: ProductMedia[];
  location: Location;
  productFields: ProductFields[];
  user: User;
  title: string;
  description?: string;
  price?: string;
  isFavorite: boolean;
}
