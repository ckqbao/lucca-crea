import { api } from '.'
import { Pavilion } from './pavilions'
import { PaginatedResponse } from './types'

type TotemTimingsData = {
  pavilions: Array<
    Pick<Pavilion, 'code' | 'name' | 'coordinates'> & {
      _id: string
      entranceId: string
      timingColor: string
      timingLabel: string
      realTimingValue: number
      numberOfEntrances: number
      entrances: Array<{
        entranceId: string
        entranceName: string
        entranceCode: string
        coordinates: string
        timingColor: string
        timingValue: number
      }>
    }
  >
}

type Slide = {
  title: string
  image: string
  video: boolean
  videoFileName: string
  order: number
  active: boolean
  deleted: boolean
  id: string
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBigScreenTimingsData: builder.query<TotemTimingsData, void>({
      query: () => ({
        url: '/data/bigscreentimings',
        method: 'GET',
      }),
    }),
    getSlides: builder.query<PaginatedResponse<Slide>, void>({
      query: () => ({
        url: '/slides',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetBigScreenTimingsDataQuery, useGetSlidesQuery } = authApi
