import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    // prepareHeaders: (headers, { getState }) => {
    //   // By default, if we have a token in the store, let's use that for authenticated requests
    //   const token = getState().auth.tokenlc
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`)
    //   }
    //   return headers
    // },
  }),
  endpoints: () => ({}),
})
