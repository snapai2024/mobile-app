import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { GetHeaderBuilder } from "./headers";

export interface Period {
  from: string | undefined;
  to: string | undefined;
}

export const tagTypes = ["assets", "auth", "user", "collection", "image"];

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/`,
    prepareHeaders: (headers, { getState }) => {
      return GetHeaderBuilder(headers, getState)
        .prepareAuthorizationHeader()
        .build();
    },
  }),
  tagTypes: tagTypes,
  endpoints: () => ({}),
});
