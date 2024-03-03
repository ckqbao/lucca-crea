import { api } from '.'
import { User } from './users'
import { cacher } from '@/utils/rtkQueryCacheUtils'

type LoginResponse = {
  user: User
  access: {
    token: string
    expires: string
  }
  refresh: {
    token: string
    expires: string
  }
}

type LoginArg = {
  email: string
  password: string
}

type LogoutArg = {
  refreshToken: string
}

const AUTH_ENDPOINT = '/auth'

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginArg>({
      query: (credentials) => ({
        url: `${AUTH_ENDPOINT}/login`,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: cacher.invalidatesUnauthorized(),
    }),
    logout: builder.mutation<void, LogoutArg>({
      query: (body) => ({
        url: `${AUTH_ENDPOINT}/logout`,
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useLogoutMutation } = authApi
