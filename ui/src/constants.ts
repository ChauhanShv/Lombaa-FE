// export const PASSWORD_REGEX: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
// export const PASSWORD_REGEX: RegExp = /^.{6,}$/;
export const PASSWORD_REGEX: RegExp = /^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/;
export const MOBILE_REGEX: RegExp =
  /^[0-9][0-9]{9,14}$/;
export const TIN_REGEX: RegExp = /^(?:\d{3}-\d{2}-\d{4}|\d{2}-\d{7})$/;
export const NAME_MIN_LENGTH = 3;
export const TIN_MIN_LENGTH = 6;
export const COMMON_ERROR_MESSAGE: string = 'Something went wrong';
