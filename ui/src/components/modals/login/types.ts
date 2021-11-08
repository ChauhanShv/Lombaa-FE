export interface LoginProps {
    show: boolean;
    openRegister: Function;
    onClose: Function;
};
export interface FormFields {
    email: string;
    password: string;
};

export enum AccountType {
    BUSINESS = 'business',
    INDIVIDUAL = 'standard',
};
