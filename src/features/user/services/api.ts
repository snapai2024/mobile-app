import { baseApi, tagTypes } from "../../../common/services/api";
import { Collection } from "../../collection/models/collection";
import { UserModel, UserRequest, UserResponse } from "../models/user";

export const userApi = baseApi.injectEndpoints({
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
      providesTags: ["user"],
    }),
    getMyCollections: builder.query<Collection[], void>({
      query: () => `/user/reservation`,
      transformResponse: (res: { reservations: Collection[] }) =>
        res.reservations.map((elt) => elt),
      providesTags: ["user"],
    }),
  }),
});

export const { usePostUserMutation, useGetMeQuery, useGetMyCollectionsQuery } =
  userApi;
