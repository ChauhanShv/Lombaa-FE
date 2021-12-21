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
