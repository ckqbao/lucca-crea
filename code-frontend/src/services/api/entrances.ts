import { api } from '.'
// import { cacher } from '@/utils/rtkQueryCacheUtils'
import { PAVILIONS_ENDPOINT } from './pavilions'
import { PaginatedResponse } from './types'

export type Entrance = {
  name: string
  code: string
  coordinates: string
  threshold0: number
  threshold1: number
  threshold2: number
  threshold3: number
  threshold4: number
  threshold5: number
  active: boolean
  _id: string
}

type AddEntranceArg = Omit<Entrance, 'active' | '_id'> & { pavilionId: string }
type ListEntranceArg = { pavilionId: string }
type EditEntranceArg = Partial<Omit<Entrance, '_id'>> & { id: string; pavilionId: string }
type DeleteEntranceArg = { entranceId: string; pavilionId: string }

export const ENTRANCES_ENDPOINT = '/entrances'

const entrancesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addEntrance: builder.mutation<Entrance, AddEntranceArg>({
      query: ({ pavilionId, ...body }) => ({
        url: `${PAVILIONS_ENDPOINT}/${pavilionId}${ENTRANCES_ENDPOINT}`,
        method: 'POST',
        body,
      }),
      // invalidatesTags: cacher.invalidatesList("Entrance")
    }),
    editEntrance: builder.mutation<Entrance, EditEntranceArg>({
      query: ({ id, pavilionId, ...body }) => ({
        url: `${PAVILIONS_ENDPOINT}/${pavilionId}/entrance/${id}`,
        method: 'PATCH',
        body,
      }),
      // invalidatesTags: cacher.cacheByIdArgProperty("Entrance")
    }),
    getEntrancesListByPavilion: builder.query<PaginatedResponse<Entrance>, ListEntranceArg>({
      query: ({ pavilionId }) => ({
        url: `${PAVILIONS_ENDPOINT}/${pavilionId}${ENTRANCES_ENDPOINT}`,
        method: 'GET',
      }),
      // providesTags: (results, error) => {
      //   if (results) {
      //     // successful query
      //     return [{ type: 'Entrance', id: 'LIST' }, ...results.results.map(({ _id }) => ({ type: 'Entrance', id: _id } as const))]
      //   }
      //   // Received an error, include an error cache item to the cache list
      //   return cacher.concatErrorCache([{ type: 'Entrance', id: 'LIST' }], error)
      // },
    }),
    deleteEntrance: builder.mutation<string, DeleteEntranceArg>({
      query: ({ entranceId, pavilionId }) => ({
        url: `${PAVILIONS_ENDPOINT}/${pavilionId}/entrance/${entranceId}`,
        method: 'DELETE',
      }),
      // invalidatesTags: cacher.cacheByIdArg("Entrance")
    }),
  }),
  overrideExisting: false,
})

export const { useAddEntranceMutation, useEditEntranceMutation, useGetEntrancesListByPavilionQuery, useDeleteEntranceMutation } = entrancesApi
