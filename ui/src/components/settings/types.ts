export interface ChangePhoneFormFeilds {
    phoneNumber: string,
};
export interface ChangePasswordFormFeilds {
    oldPassword: string,
    password: string,
}
export interface ChangeEmailFormFeilds {
    email: string,
}

export interface AlertType {
    variant?: string;
    message?: string;
};