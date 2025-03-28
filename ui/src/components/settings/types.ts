export interface PersonalDetailsProps {
  show: boolean;
  onClose: Function;
}
export interface ImageModalProps {
  image: any;
  show: boolean;
  onClose: Function;
  onImageCropComplete: any;
}
export interface ChangePhoneFormFeilds {
  countryCode: string;
  phoneNumber: string;
}
export interface ChangePasswordFormFeilds {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
export interface ChangeEmailFormFeilds {
  email: string;
}
export interface ProfileDetailsFormFeilds {
  name: string;
  location: string;
  birthday: string;
  sex: string;
  bio: string;
}
export interface AlertType {
  variant?: string;
  message?: string;
}
export interface AccountTypeSelectorProps {
  onChangeAccountType: (accountType: string) => void;
}
export enum AccountType {
  BUSINESS = 'business',
  INDIVIDUAL = 'standard',
}
export interface LocationSelectorProps {
  onCitySelected: (data: object) => void;
}
export interface SelectedPackageWithCategory {
  userPackageId?: string;
  categoryId: string;
  categoryName: string;
  error?: string;
}
export interface Package {
  id: string;
  startDate: string;
  status: string;
  endDate: string;
  packageName: string;
  packageDescription: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  package: {
    id: string;
    name: string;
    title: string;
    description: string;
    type: string;
    validity: number;
    price: string;
    currency: string;
    createdAt: string;
    updatedAt?: string;
    deletedAt?: string;
  }
  user: {
    email: string;
    id: string;
    name: string;
  }
  category: {
    name: string;
  };
}
export interface Coordinate {
  type: string;
  coordinate: Array<number>;
}
export interface LocationData {
  regionId: string;
  cityId: string;
  cityName: string;
  regionName: string;
  coordinate: string;
  label: string;
}
export interface Country {
  id: string;
  name: string;
  code: string;
  coordinate: Coordinate;
  phoneCode: number;
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
