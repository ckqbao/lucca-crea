import { api } from '..'

const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: (categoryId) => ({
        url: '/categories/' + categoryId,
        method: 'GET'
      })
    }),
    getCategoriesList: builder.query({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
    }),
    getCategoryImage: builder.query({
      query: (categoryId) => ({
        url: `/categories/${categoryId}/image`,
        method: 'GET',
        responseHandler: async (response) => URL.createObjectURL(await response.blob()),
        // cache: 'no-cache',
      }),
    }),
    getParticipantsByCategory: builder.query({
      query: (categoryId) => ({
        url: `/categories/${categoryId}/participants`,
        method: 'GET'
      })
    })
  }),
  overrideExisting: false,
})

export const { useGetCategoryQuery, useGetCategoriesListQuery, useLazyGetCategoriesListQuery, useGetCategoryImageQuery, useGetParticipantsByCategoryQuery } = categoriesApi
