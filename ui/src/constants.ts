// export const PASSWORD_REGEX: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const PASSWORD_REGEX: RegExp = /^.{6,}$/;
export const MOBILE_REGEX: RegExp =
  /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
export const TIN_REGEX: RegExp = /^[a-z0-9]+$/i;
export const NAME_MIN_LENGTH = 3;
export const TIN_MIN_LENGTH = 6;
export const COMMON_ERROR_MESSAGE: string = 'Something went wrong';
