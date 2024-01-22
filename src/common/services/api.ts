import { GetHeaderBuilder } from "./headers";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/src/query/react/index";
import { authenticationActions } from "../../features/auth/services/authSlice";

export interface Period {
  from: string | undefined;
  to: string | undefined;
}

export const tagTypes = ["auth", "user", "collection", "image"];

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:5000/`,
  prepareHeaders: (headers, { getState }) => {
    return GetHeaderBuilder(headers, getState)
      .prepareAuthorizationHeader()
      .build();
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(authenticationActions.logout());
    api.dispatch(baseApi.util.invalidateTags(["user", "collection", "image"]));
  }

  if (
    result.meta &&
    result.meta.response &&
    result.meta.response.headers.has("X-Access-Token")
  ) {
    api.dispatch(baseApi.util.invalidateTags(["user", "collection", "image"]));
    api.dispatch(
      authenticationActions.login({
        token: result.meta.response.headers.get("X-Access-Token"),
      })
    );
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: tagTypes,
  endpoints: () => ({}),
});
