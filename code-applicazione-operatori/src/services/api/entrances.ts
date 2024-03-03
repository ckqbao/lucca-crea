import { api } from '.'
// import { cacher } from '@/utils/rtkQueryCacheUtils'
import { PAVILIONS_ENDPOINT, Pavilion, pavilionApi } from './pavilions'
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
    addEntrance: builder.mutation<Pavilion, AddEntranceArg>({
      query: ({ pavilionId, ...body }) => ({
        url: `${PAVILIONS_ENDPOINT}/${pavilionId}${ENTRANCES_ENDPOINT}`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPavilion } = await queryFulfilled
          dispatch(
            pavilionApi.util.updateQueryData('getPavilionsList', undefined, (draftPavilions) => {
              for (const draftPavilion of draftPavilions.results) {
                if (draftPavilion.id !== updatedPavilion.id) continue
                Object.assign(draftPavilion, updatedPavilion)
                break
              }
            })
          )
        } catch (error) {
          console.log(error)
        }
      },
      // invalidatesTags: cacher.invalidatesList("Entrance")
    }),
    editEntrance: builder.mutation<Pavilion, EditEntranceArg>({
      query: ({ id, pavilionId, ...body }) => ({
        url: `${PAVILIONS_ENDPOINT}/${pavilionId}/entrance/${id}`,
        method: 'PATCH',
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPavilion } = await queryFulfilled
          dispatch(
            pavilionApi.util.updateQueryData('getPavilionsList', undefined, (draftPavilions) => {
              for (const draftPavilion of draftPavilions.results) {
                if (draftPavilion.id !== updatedPavilion.id) continue
                Object.assign(draftPavilion, updatedPavilion)
                break
              }
            })
          )
        } catch (error) {
          console.log(error)
        }
      },
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
    deleteEntrance: builder.mutation<Pavilion, DeleteEntranceArg>({
      query: ({ entranceId, pavilionId }) => ({
        url: `${PAVILIONS_ENDPOINT}/${pavilionId}/entrance/${entranceId}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ entranceId }, { dispatch, queryFulfilled }) {
        try {
          const { data: deletedPavilion } = await queryFulfilled
          dispatch(
            pavilionApi.util.updateQueryData('getPavilionsList', undefined, (draftPavilions) => {
              for (const draftPavilion of draftPavilions.results) {
                if (draftPavilion.id !== deletedPavilion.id) continue
                Object.assign(draftPavilion, { ...deletedPavilion, entrances: deletedPavilion.entrances.filter((entrance) => entrance._id !== entranceId) })
                break
              }
            })
          )
        } catch (error) {
          console.log(error)
        }
      },
      // invalidatesTags: cacher.cacheByIdArg("Entrance")
    }),
  }),
  overrideExisting: false,
})

export const { useAddEntranceMutation, useEditEntranceMutation, useGetEntrancesListByPavilionQuery, useDeleteEntranceMutation } = entrancesApi
