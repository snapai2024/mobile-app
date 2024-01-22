import { configureStore } from "@reduxjs/toolkit";

import { queryMessageHandler } from "./middlewares/queryMessageHandler";
import { baseApi } from "../../common/services/api";
import { authenticationReducer } from "../../features/auth/services/authSlice";
import { authenticationMiddleware } from "../../features/auth/services/middleware";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      queryMessageHandler,
      authenticationMiddleware,
      baseApi.middleware
    ),
  reducer: {
    authentication: authenticationReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
