import { Middleware } from "redux";

import { authenticationActions } from "./authSlice";

export const authenticationMiddleware: Middleware =
  () => (next) => (action) => {
    if (authenticationActions.login.match(action)) {
      localStorage.setItem("token", action.payload.token as string);
    } else if (authenticationActions.logout.match(action)) {
      localStorage.removeItem("token");
    }
    return next(action);
  };
