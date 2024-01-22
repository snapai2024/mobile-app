import { baseApi, tagTypes } from "../../../common/services/api";

export const imageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postImage: builder.mutation<Image, FormData>({
      query: (req: FormData) => {
        return {
          url: "/image",
          method: "POST",
          body: req.data,
        };
      },
      invalidatesTags: tagTypes,
    }),
    analyseImage: builder.mutation<Label[], FormData>({
      query: (req: FormData) => {
        return {
          url: "/image/analyse",
          method: "POST",
          body: req.data,
        };
      },
      invalidatesTags: tagTypes,
    }),
  }),
});

export const { usePostImageMutation, useAnalyseImageMutation } = imageApi;
