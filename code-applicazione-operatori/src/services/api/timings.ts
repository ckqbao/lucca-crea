// import { cacher } from '@/utils/rtkQueryCacheUtils'
import { api } from '.'
import { PaginatedResponse } from './types'

export type Timing = {
  user: string
  value: number
  entrance: string
  pavilion: string
  operatorSampling: boolean
  active: boolean
  deleted: boolean
  createdAt: string
  updatedAt: string
  id: string
}

type AddTimingArg = Pick<Timing, 'entrance' | 'value' | 'pavilion' | 'user' | 'operatorSampling'>

export const TIMINGS_ENDPOINT = '/timings'

const timingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addTiming: builder.mutation<Timing, AddTimingArg>({
      query: (data) => ({
        url: `${TIMINGS_ENDPOINT}`,
        method: 'POST',
        body: data,
      }),
      // invalidatesTags: cacher.invalidatesList('Pavilion'),
    }),
    getTimingsList: builder.query<PaginatedResponse<Timing>, void>({
      query: () => ({
        url: `${TIMINGS_ENDPOINT}`,
        method: 'GET',
      }),
    }),
    getLastTimingByOperator: builder.query<Timing, { operator: string; pavilion: string; entrance: string }>({
      query: ({ operator, pavilion, entrance }) => ({
        url: `${TIMINGS_ENDPOINT}/lastoperatortiming/${operator}/${pavilion}/${entrance}`,
        method: 'GET',
      }),
      transformResponse(baseQueryReturnValue: Timing[]) {
        return baseQueryReturnValue[0]
      },
    }),
  }),
  overrideExisting: false,
})

export const { useAddTimingMutation, useGetLastTimingByOperatorQuery } = timingsApi
