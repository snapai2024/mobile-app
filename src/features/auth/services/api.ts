import { api, tagTypes } from "../../../common/services/api";
import { LoginRequest } from "../models/auth";

export const authenticationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginRequest>({
      query: (req: LoginRequest) => {
        return {
          url: "/authenticate",
          method: "POST",
          body: req.data,
        };
      },
      invalidatesTags: tagTypes,
    }),
  }),
});

export const { useLoginMutation } = authenticationApi;
