import { api, tagTypes } from "../../../common/services/api";
import {
  Collection,
  CollectionRequest,
} from "../../collection/models/collection";

export const collectionApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { usePostCollectionMutation } = collectionApi;
