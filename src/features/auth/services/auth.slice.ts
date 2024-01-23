import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

import { RootState } from "../../../app/redux/store";
import { TokenPayload } from "../models/token";

type AuthState = {
  token: string | null;
};

const isExpired = (token: string): boolean => {
  const claims = jwtDecode<TokenPayload>(token);
  return claims.exp < Date.now() / 1000;
};

const slice = createSlice({
  name: "authentication",
  initialState: {
    token: localStorage.getItem("token"),
  },
  reducers: {
    login: (state, { payload: { token } }: PayloadAction<AuthState>) => {
      state.token = token;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const authenticationActions = slice.actions;

export const authenticationReducer = slice.reducer;

export const selectAutenticationToken = (state: RootState): string | null =>
  state.authentication.token;

export const selectIsTokenExpired = (state: RootState): boolean =>
  !state.authentication.token || isExpired(state.authentication.token);

export const selectIsAuthenticated = (state: RootState): boolean =>
  !!state.authentication.token && !isExpired(state.authentication.token);
