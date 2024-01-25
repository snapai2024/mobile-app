import { api, tagTypes } from "../../../common/services/api";
import { ImageModel, ImageRequest } from "../models/image";
import { Label } from "../models/label";

export const imageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postImage: builder.mutation<ImageModel, ImageRequest>({
      query: (req: ImageRequest) => {
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
          body: req,
        };
      },
      invalidatesTags: tagTypes,
    }),
    deleteImage: builder.mutation<ImageModel, number>({
      query: (id) => {
        return {
          url: `/image/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: tagTypes,
    }),
  }),
});

export const {
  usePostImageMutation,
  useAnalyseImageMutation,
  useDeleteImageMutation,
} = imageApi;
