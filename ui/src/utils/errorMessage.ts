// @ts-nocheck
import { AxiosError } from 'axios';
import { COMMON_ERROR_MESSAGE } from '../constants';

export const getAPIErrorMessage = (error: AxiosError): string => {
    return error?.response?.data.error?.messageDetail || COMMON_ERROR_MESSAGE;
};