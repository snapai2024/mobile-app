import { configureStore } from "@reduxjs/toolkit";

import { queryMessageHandler } from "./middlewares/queryMessageHandler";
import { api } from "../../common/services/api";
import { authenticationReducer } from "../../features/auth/services/auth.slice";
import { authenticationMiddleware } from "../../features/auth/services/middleware";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      queryMessageHandler,
      authenticationMiddleware,
      api.middleware
    ),
  reducer: {
    authentication: authenticationReducer,
    [api.reducerPath]: api.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
