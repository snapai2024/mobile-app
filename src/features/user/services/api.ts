import { api, tagTypes } from "../../../common/services/api";
import { Collection } from "../../collection/models/collection";
import { UserModel, UserRequest, UserResponse } from "../models/user";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
    getMe: builder.query<UserResponse, void>({
      query: () => `/user/me`,
      transformResponse: (res: { user: UserModel }) => ({ ...res.user }),
      providesTags: tagTypes,
    }),
    getMyCollections: builder.query<Collection[], void>({
      query: () => `/user/me/collections`,
      providesTags: tagTypes,
    }),
  }),
});

export const { usePostUserMutation, useGetMeQuery, useGetMyCollectionsQuery } =
  userApi;
