// @ts-nocheck
import { AxiosError } from 'axios';
import { COMMON_ERROR_MESSAGE } from '../constants';

export const getAPIErrorMessage = (error: AxiosError): string => {
    //console.log(error?.response?.data[0].message, 'AxiosError');
    // error?.response?.data.error?.messageDetail
    return error?.response?.data[0].message || COMMON_ERROR_MESSAGE;
};