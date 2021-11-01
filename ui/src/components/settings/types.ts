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

export interface ProfileDetailsFormFeilds {
    name: string;
    location: string;
    birthday: string;
    sex: string;
    bio: string;
};

export interface AlertType {
    variant?: string;
    message?: string;
};