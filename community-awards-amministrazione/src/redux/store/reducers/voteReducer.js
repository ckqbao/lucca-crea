import { createEntityAdapter, createReducer } from '@reduxjs/toolkit'
import {
  ADD_VOTE_FAILED,
  ADD_VOTE_REQUEST,
  ADD_VOTE_SUCCEED,
  GET_VOTES_LIST_FAILED,
  GET_VOTES_LIST_REQUEST,
  GET_VOTES_LIST_SUCCEED,
} from '../../ActionTypes'

const votesAdapter = createEntityAdapter({
  selectId: (vote) => vote._id.par,
})

const initialState = {
  error: null,
  votes: [],
  loading: {
    add: false,
    list: false,
  },
}

const voteReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_VOTE_REQUEST, (state) => {
      state.loading.add = true
    })
    .addCase(ADD_VOTE_SUCCEED, (state) => {
      state.loading.add = false
    })
    .addCase(ADD_VOTE_FAILED, (state, action) => {
      state.error = action.payload
      state.loading.add = false
    })
    .addCase(GET_VOTES_LIST_REQUEST, (state, action) => {
      state.loading.list = true
    })
    .addCase(GET_VOTES_LIST_SUCCEED, (state, action) => {
      state.votes = action.payload
      state.loading.list = false
    })
    .addCase(GET_VOTES_LIST_FAILED, (state, action) => {
      state.error = action.payload
      state.loading.list = false
    })
})

export const selectVotes = (state) => state.vote.votes

export default voteReducer
