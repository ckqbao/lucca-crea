import { api } from '..'

const participantsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getParticipantsList: builder.query({
      query: () => ({
        url: '/participants',
        method: 'GET',
      }),
    }),
    getParticipantImage: builder.query({
      query: (participantId) => ({
        url: `/participants/${participantId}/image`,
        method: 'GET',
        responseHandler: async (response) => URL.createObjectURL(await response.blob()),
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetParticipantsListQuery, useGetParticipantImageQuery } = participantsApi
