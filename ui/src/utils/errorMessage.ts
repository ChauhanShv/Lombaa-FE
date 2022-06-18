import React from 'react';
import { COMMON_ERROR_MESSAGE } from '../constants';

export const getAPIErrorMessage = (error?: any): string => {
  console.log(error?.response?.data?.message, "");
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error?.message_detail ||
    error?.response?.data?.error?.messageDetail ||
    error?.response?.data?.error?.message ||
    COMMON_ERROR_MESSAGE
  );
};

export const getErrorClassName = (field: string, errors: any): string => {
  const errorMessages: any = {
    ...errors,
  };
  return errorMessages[field] ? 'is-invalid' : '';
};
