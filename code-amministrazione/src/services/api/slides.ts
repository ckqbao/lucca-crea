import _ from 'lodash'
import { api } from '.'
import { PaginatedResponse } from './types'

import { cacher } from '@/utils/rtkQueryCacheUtils'

export type Slide = {
  title: string
  image: string
  video: boolean
  videoFileName: string
  order: number
  active: boolean
  deleted: boolean
  id: string
}

export type AddSlideArg = Pick<Slide, 'title' | 'order' | 'active'> & {
  image?: File
  video?: boolean
  videoFileName?: string
}
export type EditSlideArg = Partial<Omit<Slide, 'id' | 'image'>> & { id: string, image?: File }

export const SLIDES_ENDPOINT = '/slides'

export const pavilionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addSlide: builder.mutation<Slide, AddSlideArg>({
      query: (data) => {
        const formData = new FormData()

        formData.append('active', data.active.toString())
        formData.append('order', data.order.toString())
        formData.append('title', data.title)

        if (data.image) formData.append('image', data.image)
        if (data.videoFileName && data.video) {
          formData.append('video', data.video.toString())
          formData.append('videoFileName', data.videoFileName)
        }

        return {
          url: `${SLIDES_ENDPOINT}`,
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: cacher.invalidatesList('Slide'),
    }),
    editSlide: builder.mutation<Slide, EditSlideArg>({
      query: ({ id, ...data }) => {
        const formData = new FormData()

        if (!_.isUndefined(data.active)) formData.append('active', data.active.toString())
        if (!_.isUndefined(data.order)) formData.append('order', data.order.toString())
        if (data.title) formData.append('title', data.title)

        if (data.image) formData.append('image', data.image)
        if (data.videoFileName && data.video) {
          formData.append('video', data.video.toString())
          formData.append('videoFileName', data.videoFileName)
        }

        return {
          url: `${SLIDES_ENDPOINT}/${id}`,
          method: 'PATCH',
          body: formData,
        }
      },
      invalidatesTags: cacher.cacheByIdArgProperty('Slide'),
    }),
    getSlidesList: builder.query<PaginatedResponse<Slide>, void>({
      query: () => ({
        url: `${SLIDES_ENDPOINT}`,
        method: 'GET',
      }),
      providesTags: cacher.providesNestedList('Slide'),
    }),
    getSlide: builder.query<Slide, string>({
      query: (slideId) => ({
        url: `${SLIDES_ENDPOINT}/${slideId}`,
        method: 'GET',
      }),
    }),
    deleteSlide: builder.mutation<string, string>({
      query: (id) => ({
        url: `${SLIDES_ENDPOINT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: cacher.cacheByIdArg('Slide'),
    }),
  }),
  overrideExisting: false,
})

export const { useAddSlideMutation, useEditSlideMutation, useGetSlidesListQuery, useGetSlideQuery, useDeleteSlideMutation } = pavilionApi
