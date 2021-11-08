import { COMMON_ERROR_MESSAGE } from '../constants';

export const getAPIErrorMessage = (error?: any): string => {
    return error?.response?.data.error?.messageDetail || COMMON_ERROR_MESSAGE;
};