import { api } from '..'

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/access/loginonmylcg',
        method: 'POST',
        body: credentials,
        redirect: 'follow',
        // credentials: "include",
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLoginMutation } = authApi
