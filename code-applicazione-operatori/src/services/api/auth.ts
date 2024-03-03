import { api } from '.'
import { cacher } from '@/utils/rtkQueryCacheUtils'
import { User } from './users'

type LoginResponse = {
  operator: User
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
  username: string
}

type LogoutArg = {
  refreshToken: string
}

const AUTH_ENDPOINT = '/auth'

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginArg>({
      query: (credentials) => ({
        url: `${AUTH_ENDPOINT}/operatorlogin`,
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
