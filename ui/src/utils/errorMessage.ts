import React from 'react';
import { COMMON_ERROR_MESSAGE } from '../constants';

export const getAPIErrorMessage = (error?: any): string => {
  return (
    error?.response?.data.error?.messageDetail ||
    error?.response?.data[0]?.message ||
    COMMON_ERROR_MESSAGE
  );
};

export const getErrorClassName = (field: string, errors: any): string => {
  const errorMessages: any = {
    ...errors,
  };
  return errorMessages[field] ? 'is-invalid' : '';
};
