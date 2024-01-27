import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { GetHeaderBuilder } from "./headers";

export interface Period {
  from: string | undefined;
  to: string | undefined;
}

export interface AttachmentModel {
  url: string;
  size: number;
  type?: string;
}

export const tagTypes = ["assets", "auth", "user", "collection", "image"];

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `http://10.0.2.2:5000/`,
    prepareHeaders: (headers, { getState }) => {
      return GetHeaderBuilder(headers, getState)
        .prepareAuthorizationHeader()
        .build();
    },
  }),
  tagTypes: tagTypes,
  endpoints: (builder) => ({
    getFile: builder.query<AttachmentModel, string>({
      async queryFn(path) {
        const result = await fetch(`http://10.0.2.2:5000/file?path=${path}`);

        if (result.status !== 200) return { error: await result.json() };

        const blob: Blob = await result.blob();

        const blobType: string | undefined = blob.type.split("/").at(-1);

        return {
          data: {
            url: URL.createObjectURL(blob),
            size: blob.size,
            type: blobType,
          },
        };
      },
    }),
  }),
});

export const { useGetFileQuery } = api;
