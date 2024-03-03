import { createEntityAdapter, createReducer } from '@reduxjs/toolkit'

import {
  ADD_PARTICIPANT_FAILED,
  ADD_PARTICIPANT_REQUEST,
  ADD_PARTICIPANT_SUCCEED,
  DELETE_PARTICIPANT_FAILED,
  DELETE_PARTICIPANT_REQUEST,
  DELETE_PARTICIPANT_SUCCEED,
  EDIT_PARTICIPANT_FAILED,
  EDIT_PARTICIPANT_REQUEST,
  EDIT_PARTICIPANT_SUCCEED,
  GET_PARTICIPANTS_BY_CATEGORY_FAILED,
  GET_PARTICIPANTS_BY_CATEGORY_REQUEST,
  GET_PARTICIPANTS_BY_CATEGORY_SUCCEED,
  GET_PARTICIPANTS_LIST_FAILED,
  GET_PARTICIPANTS_LIST_REQUEST,
  GET_PARTICIPANTS_LIST_SUCCEED,
  GET_PARTICIPANT_FAILED,
  GET_PARTICIPANT_REQUEST,
  GET_PARTICIPANT_SUCCEED,
} from '../../ActionTypes'

const participantsAdapter = createEntityAdapter({
  selectId: (participant) => participant.id,
})
const participantsSelectors = participantsAdapter.getSelectors(
  (state) => state.participant.participantsList
)

const initialState = {
  participantsList: participantsAdapter.getInitialState(),
  error: null,
  loading: {
    add: false,
    list: false,
    edit: false,
    delete: false,
  },
  total: 0,
}

const participantReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_PARTICIPANT_REQUEST, (state, action) => {
      state.loading.add = true
    })
    .addCase(ADD_PARTICIPANT_SUCCEED, (state, action) => {
      const { payload } = action
      participantsAdapter.addOne(state.participantsList, payload)
      state.loading.add = false
      state.total++
    })
    .addCase(ADD_PARTICIPANT_FAILED, (state, action) => {
      state.error = action.payload
      state.loading.add = false
    })
    .addCase(GET_PARTICIPANT_REQUEST, (state, action) => {
      state.loading.get = true
    })
    .addCase(GET_PARTICIPANT_SUCCEED, (state, action) => {
      const { payload } = action
      participantsAdapter.setOne(state.participantsList, payload)
      state.loading.get = false
      state.total++
    })
    .addCase(GET_PARTICIPANT_FAILED, (state, action) => {
      state.error = action.payload
      state.loading.get = false
    })
    .addCase(GET_PARTICIPANTS_LIST_REQUEST, (state, action) => {
      state.loading.list = true
    })
    .addCase(GET_PARTICIPANTS_LIST_SUCCEED, (state, action) => {
      const { payload } = action
      participantsAdapter.setAll(state.participantsList, payload.results ?? [])
      state.loading.list = false
      state.total = payload.totalResults
    })
    .addCase(GET_PARTICIPANTS_LIST_FAILED, (state, action) => {
      state.error = action.payload
      state.loading.list = false
    })
    .addCase(GET_PARTICIPANTS_BY_CATEGORY_REQUEST, (state, action) => {
      state.loading.list = true
    })
    .addCase(GET_PARTICIPANTS_BY_CATEGORY_SUCCEED, (state, action) => {
      participantsAdapter.setAll(state.participantsList, action.payload)
      state.loading.list = false
    })
    .addCase(GET_PARTICIPANTS_BY_CATEGORY_FAILED, (state, action) => {
      state.error = action.payload
      state.loading.list = false
    })
    .addCase(EDIT_PARTICIPANT_REQUEST, (state, action) => {
      state.loading.edit = true
    })
    .addCase(EDIT_PARTICIPANT_SUCCEED, (state, action) => {
      const { payload } = action
      participantsAdapter.updateOne(state.participantsList, {
        id: payload.id,
        changes: payload,
      })
      state.loading.edit = false
    })
    .addCase(EDIT_PARTICIPANT_FAILED, (state, action) => {
      state.error = action.payload
      state.loading.edit = false
    })
    .addCase(DELETE_PARTICIPANT_REQUEST, (state, action) => {
      state.loading.delete = true
    })
    .addCase(DELETE_PARTICIPANT_SUCCEED, (state, action) => {
      participantsAdapter.removeOne(state.participantsList, action.payload)
      state.loading.delete = false
    })
    .addCase(DELETE_PARTICIPANT_FAILED, (state, action) => {
      state.error = action.payload
      state.loading.delete = false
    })
})

export const selectParticipants = participantsSelectors.selectAll

export default participantReducer
