export interface ProductDetailProps {
  productDetail: ProductDetail;
}
export interface ProductDetailImageSliderProps {
  productMedia: ProductMedia[];
  productCategory: ProductDetailCategory;
  productName?: string;
}
export interface ProductDetailDescriptionProps {
  productDetail: ProductDetail;
}
export interface SellerDetailsCardProps {
  user: User;
}
export interface ProductDetail {
  approvedAt: string;
  category: ProductDetailCategory;
  categoryId: string;
  description?: string;
  expiry: string;
  id: string;
  location: Location;
  locationId: string;
  postedAt: string;
  price?: string | number;
  productFields: ProductFields[];
  productMedia: ProductMedia[];
  rejectReason: string | null;
  rejectedAt: string | null;
  slug: string;
  soldAt: string | null;
  title?: string;
  user: User;
  userId: string;
}
export interface ProductMedia {
  id: string;
  isPrimary: boolean;
  fileId: string;
  productId: string;
  file: ProductMediaFile;
}
export interface ProductMediaFile {
  id: string;
  url: string;
  mime: string;
  extension: string;
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
  fieldType: string;
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
export interface ProductDetailCategory {
  description: string;
  id: string;
  isActive: string;
  isPopular: string;
  name: string;
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
  currencyCode?: string;
  currencySymbol?: string;
}
export interface User {
  accountType: string;
  email: string;
  location: Location;
  locationId: string;
  name: string;
  profilePicture: ProductMediaFile;
  profilePictureId: string;
}
