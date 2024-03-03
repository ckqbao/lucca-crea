import { api } from '.'
import { BaseModel, PaginatedResponse } from './types'
import { cacher } from '@/utils/rtkQueryCacheUtils'

export type User = BaseModel & {
  name: string
  surname: string
  email: string
  role: string
  isEmailVerified: boolean
  lastPasswordUpdate: string
  active: boolean
  firstAccess: boolean
  deleted: boolean
  fullname: string
}

type AddUserArg = Pick<User, 'name' | 'surname' | 'email' | 'role'> & {
  password: string
  avatar?: File
}

type EditUserArg = Partial<Omit<User, 'id'>> & { id: string }

export const USERS_ENDPOINT = '/users'

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation<User, AddUserArg>({
      query: (data) => ({
        url: `${USERS_ENDPOINT}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: cacher.invalidatesList('User'),
    }),
    editUser: builder.mutation<User, EditUserArg>({
      query: ({ id, ...body }) => ({
        url: `${USERS_ENDPOINT}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: cacher.cacheByIdArgProperty('User'),
    }),
    getUsersList: builder.query<PaginatedResponse<User>, void>({
      query: () => ({
        url: `${USERS_ENDPOINT}`,
        method: 'GET',
      }),
      providesTags: cacher.providesNestedList('User'),
    }),
    deleteUser: builder.mutation<string, string>({
      query: (id) => ({
        url: `${USERS_ENDPOINT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: cacher.cacheByIdArg('User'),
    }),
  }),
  overrideExisting: false,
})

export const { useAddUserMutation, useEditUserMutation, useGetUsersListQuery, useDeleteUserMutation } = userApi
