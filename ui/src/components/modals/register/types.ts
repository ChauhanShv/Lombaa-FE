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
  phoneNumber: string;
  tinNumber: string;
  businessName: string;
}

export enum AccountType {
  BUSINESS = 'business',
  INDIVIDUAL = 'standard',
}
