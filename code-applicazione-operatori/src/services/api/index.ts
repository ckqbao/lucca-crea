import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { RootState } from '@/redux/store'
import { cacher } from '@/utils/rtkQueryCacheUtils'

import { Pavilion } from './pavilions'

type DataTimings = {
  pavilions: Array<
    Pick<Pavilion, 'code' | 'name' | 'coordinates' | 'forcedStatus' | 'forcedStatusValue'> & {
      _id: string
      entranceId: string
      timingRange: string
      timingColor: string
      timingLabel: string
      realTimingValue: number
      numberOfEntrances: number
      entrances: Array<{
        entranceId: string
        entranceName: string
        entranceCode: string
        coordinates: string
        timingRange: string
        timingColor: string
        timingLabel: string
        timingValue: number
        userSubmittedData: {
          threshold_0_count: number
          threshold_1_count: number
          threshold_2_count: number
          threshold_3_count: number
          threshold_4_count: number
          threshold_5_count: number
        }
      }>
    }
  >
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.access?.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: [...cacher.defaultTags, 'Entrance', 'Pavilion', 'User'],
  endpoints: (builder) => ({
    getDataTimings: builder.query<DataTimings, void>({
      query: () => ({
        url: '/data/timings',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetDataTimingsQuery } = api
