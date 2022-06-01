export interface ProfileHeaderCardProps {
  otherUser?: OtherUser;
}
export interface ProfileProductTileProps {
  productId: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  categoryName: string;
  postedOnDate: string;
  mediaSrc: string;
  isFavouritesTab: boolean;
  onDelete: (productId: string) => void; 
}
export interface ProductTabListProps {
  productList: Product[];
  listingTabName: string;
}
export interface ProductTab {
  inReview?: Product[];
  active?: Product[];
  declined?: Product[];
  expired?: Product[];
  sold?: Product[];
}
export interface TabContentProps {
  tabTitle: string;
}
export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  approvedAt: string;
  postedAt: string;
  soldAt: string;
  rejectedAt: string;
  rejectReason: string;
  expiry: string;
  categoryId: string;
  category: Category;
  locationId: string;
  userId: string;
  productMedia: ProductMedia[];
  productFields: ProductFields[];
  user: User;
}
export interface Category {
  id: string;
  description: string;
  isActive: string;
  isPopular: string;
  name: string;
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
export interface User {
  name: string;
  profilePictureId: string;
  profilePicture: ProfilePicture;
}
export interface ProfilePicture {
  id: string;
  url: string;
  mime: string;
  extension: string;
}
export interface OtherUser {
  accountType?: string;
  businessName?: string;
  createdAt?: string;
  memberSince?: string;
  email?: string;
  location?: Location;
  locationId?: string;
  name?: string;
  phoneNumber?: string;
  profilePicture?: ProfilePicture;
  profilePictureId?: string;
  profileVerificationScore?: string;
  showPhoneNumberConsent?: string;
}