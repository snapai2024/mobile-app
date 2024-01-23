import { api, tagTypes } from "../../../common/services/api";
import { Collection } from "../../collection/models/collection";
import { UserRequest, UserResponse } from "../models/user";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<UserResponse, void>({
      query: () => `/user/me`,
      providesTags: tagTypes,
    }),
    getMyCollections: builder.query<Collection[], void>({
      query: () => `/user/me/collections`,
      providesTags: tagTypes,
    }),
    postUser: builder.mutation<UserResponse, UserRequest>({
      query: (arg: UserRequest) => {
        return {
          url: "/user",
          method: "POST",
          body: arg,
        };
      },
      invalidatesTags: tagTypes,
    }),
    patchUser: builder.mutation<UserResponse, UserRequest>({
      query: ({ id, ...data }) => {
        return {
          url: `/user/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: tagTypes,
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetMyCollectionsQuery,
  usePostUserMutation,
  usePatchUserMutation,
} = userApi;
