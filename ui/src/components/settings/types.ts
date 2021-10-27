export interface PersonalDetailsProps {
    show: boolean,
    onClose: Function,
};

export interface ImageModalProps {
    image: any,
    show: boolean,
    onClose: Function,
};
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