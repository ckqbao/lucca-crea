// import { cacher } from '@/utils/rtkQueryCacheUtils'
import { api } from '.'

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
        url: `${TIMINGS_ENDPOINT}/usertiming`,
        method: 'POST',
        body: data,
      }),
      // invalidatesTags: cacher.invalidatesList('Pavilion'),
    }),
  }),
  overrideExisting: false,
})

export const { useAddTimingMutation } = timingsApi
