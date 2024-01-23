import {isFulfilled, isRejectedWithValue} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {Middleware} from 'redux';

export type FulfilledActionResponse = {
  data: any;
  successMessage?: string;
};

export type RejectedActionResponse = {
  error: any;
  errorMessage?: string;
};

export const queryMessageHandler: Middleware = () => (next) => (action) => {
  if (isFulfilled(action) && action.payload.successMessage) {
    toast.success(action.payload.successMessage);
  }

  if (isRejectedWithValue(action) && action.payload.errorMessage) {
    toast.error(action.payload.errorMessage);
  }

  return next(action);
};
