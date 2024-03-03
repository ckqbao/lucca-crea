import Cookies from 'js-cookie'
import { api } from '..'

const voteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVotesByUser: builder.query({
      query: ({ userId, categoryId }) => ({
        url: `/votes/isvotingenabledforuser/${userId}/${categoryId}`,
        method: 'GET',
      }),
    }),
    testVote: builder.mutation({
      query: (data) => ({
        url: '/votes/testvote',
        method: 'POST',
        body: data,
      }),
    }),
    vote: builder.mutation({
      query: ({ categoryId, externalUserId, participantId }) => ({
        url: `/votes/vote`,
        method: 'POST',
        body: { categoryId, externalUserId, participantId },
        headers: {
          'lcgauth': Cookies.get('awardcookie'),
        },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLazyGetVotesByUserQuery, useTestVoteMutation, useVoteMutation } = voteApi
