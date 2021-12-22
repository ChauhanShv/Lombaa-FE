export interface RegisterProps {
  show: boolean;
  openLogin: Function;
  onClose: Function;
}
export interface FormFields {
  name: string;
  email: string;
  password: string;
  accountType: string;
  countryCode: string;
  phoneNumber: string;
  phoneCode: string;
  tinNumber: string;
  businessName: string;
}

export interface PhoneCodeProps {
  onPhoneCodeChange: (phoneCode: string) => void;
}

export enum AccountType {
  BUSINESS = 'business',
  INDIVIDUAL = 'standard',
}
