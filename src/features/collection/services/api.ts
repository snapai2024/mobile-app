import { UserRequest } from "@/features/user/models/user";
import { baseApi, tagTypes } from "../../../common/services/api";
import { Collection } from "../../collection/models/collection";

export const collectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postCollection: builder.mutation<Collection, CollectionRequest>({
      query: (arg: UserRequest) => {
        return {
          url: "/collection",
          method: "POST",
          body: arg,
        };
      },
      invalidatesTags: tagTypes,
    }),
});

export const { usePostCollectionMutation } = collectionApi;
