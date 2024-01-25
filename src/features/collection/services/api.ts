import { api, tagTypes } from "../../../common/services/api";
import {
  Collection,
  CollectionRequest,
} from "../../collection/models/collection";

export const collectionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCollectionById: builder.query<Collection, number>({
      query: (id) => `/collection/${id}`,
      providesTags: tagTypes,
    }),
    postCollection: builder.mutation<Collection, CollectionRequest>({
      query: (arg: CollectionRequest) => {
        return {
          url: "/collection",
          method: "POST",
          body: arg,
        };
      },
      invalidatesTags: tagTypes,
    }),
    deleteCollection: builder.mutation<Collection, number>({
      query: (id) => {
        return {
          url: `/collection/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: tagTypes,
    }),
  }),
});

export const { useGetCollectionByIdQuery, usePostCollectionMutation, useDeleteCollectionMutation } =
  collectionApi;
