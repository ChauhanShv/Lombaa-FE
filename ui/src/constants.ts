// export const PASSWORD_REGEX: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const PASSWORD_REGEX: RegExp = /^.{6,}$/;
export const MOBILE_REGEX: RegExp = /^[6-9][0-9]{9}$/;
export const TIN_REGEX: RegExp = /^[a-z0-9]+$/i;
export const NAME_MIN_LENGTH = 3;
export const TIN_MIN_LENGTH = 6;
export const COMMON_ERROR_MESSAGE: string = 'Something went wrong';
