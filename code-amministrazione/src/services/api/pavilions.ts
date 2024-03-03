import { cacher } from '@/utils/rtkQueryCacheUtils'
import { api } from '.'
import { Entrance } from './entrances'
import { PaginatedResponse } from './types'

export type Pavilion = {
  active: boolean
  code: string
  coordinates: string
  createdAt: string
  deleted: boolean
  entrances: Entrance[]
  forcedStatus: boolean
  forcedStatusValue: number
  id: string
  name: string
  updatedAt: string
}

type AddPavilionArg = Pick<Pavilion, 'code' | 'coordinates' | 'name'> & Partial<Omit<Pavilion, 'code' | 'coordinates' | 'entrances' | 'id' | 'name'>>
type EditPavilionArg = Partial<Omit<Pavilion, 'id'>> & { id: string }

export const PAVILIONS_ENDPOINT = '/pavilions'

export const pavilionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addPavilion: builder.mutation<Pavilion, AddPavilionArg>({
      query: (data) => ({
        url: `${PAVILIONS_ENDPOINT}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: cacher.invalidatesList('Pavilion'),
    }),
    editPavilion: builder.mutation<Pavilion, EditPavilionArg>({
      query: ({ id, ...body }) => ({
        url: `${PAVILIONS_ENDPOINT}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: cacher.cacheByIdArgProperty('Pavilion'),
    }),
    getPavilionsList: builder.query<PaginatedResponse<Pavilion>, void>({
      query: () => ({
        url: `${PAVILIONS_ENDPOINT}`,
        method: 'GET',
      }),
      providesTags: cacher.providesNestedList('Pavilion'),
    }),
    getPavilion: builder.query<Pavilion, string>({
      query: (pavilionId) => ({
        url: `${PAVILIONS_ENDPOINT}/${pavilionId}`,
        method: 'GET',
      }),
    }),
    deletePavilion: builder.mutation<string, string>({
      query: (id) => ({
        url: `${PAVILIONS_ENDPOINT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: cacher.cacheByIdArg('Pavilion'),
    }),
  }),
  overrideExisting: false,
})

export const { useAddPavilionMutation, useGetPavilionsListQuery, useLazyGetPavilionQuery, useEditPavilionMutation, useDeletePavilionMutation } = pavilionApi
