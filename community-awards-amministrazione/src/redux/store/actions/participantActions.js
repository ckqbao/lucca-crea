import { CATEGORIES_ENDPOINT } from './categoryActions'
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

import request from '../../../helpers/requestHelper'

export const PARTICIPANTS_ENDPOINT = '/participants'

export const addParticipant = (data) => async (dispatch) => {
  dispatch({ type: ADD_PARTICIPANT_REQUEST })

  const formData = new FormData()

  formData.append('category', data.category)
  formData.append('description', data.description)
  formData.append('name', data.name)

  if (data.participantImage)
    formData.append('participantImage', data.participantImage)

  try {
    const res = await request({
      url: `${PARTICIPANTS_ENDPOINT}`,
      auth: true,
      method: 'POST',
      data: formData,
    })
    if (res.code) {
      dispatch({
        type: ADD_PARTICIPANT_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: ADD_PARTICIPANT_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: ADD_PARTICIPANT_FAILED,
      payload: err,
    })
  }
}

export const getParticipant = (participantId) => async (dispatch) => {
  dispatch({ type: GET_PARTICIPANT_REQUEST })

  try {
    const res = await request({
      url: `${PARTICIPANTS_ENDPOINT}/${participantId}`,
      auth: true,
      method: 'GET',
    })

    if (res.code) {
      dispatch({
        type: GET_PARTICIPANT_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: GET_PARTICIPANT_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: GET_PARTICIPANT_FAILED,
      payload: err,
    })
  }
}

export const getParticipantsList = (page) => async (dispatch) => {
  dispatch({ type: GET_PARTICIPANTS_LIST_REQUEST })

  try {
    const res = await request({
      url: page
        ? `${PARTICIPANTS_ENDPOINT}?page=${page}&limit=20`
        : `${PARTICIPANTS_ENDPOINT}?limit=20`,
      auth: true,
      method: 'GET',
    })

    if (res.code) {
      dispatch({
        type: GET_PARTICIPANTS_LIST_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: GET_PARTICIPANTS_LIST_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: GET_PARTICIPANTS_LIST_FAILED,
      payload: err,
    })
  }
}

export const getParticipantsByCategory = (categoryId) => async (dispatch) => {
  dispatch({ type: GET_PARTICIPANTS_BY_CATEGORY_REQUEST })

  try {
    const res = await request({
      url: `${CATEGORIES_ENDPOINT}/${categoryId}/participants`,
      auth: true,
      method: 'GET',
    })

    if (res.code) {
      dispatch({
        type: GET_PARTICIPANTS_BY_CATEGORY_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: GET_PARTICIPANTS_BY_CATEGORY_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: GET_PARTICIPANTS_BY_CATEGORY_FAILED,
      payload: err,
    })
  }
}

export const editParticipant = (participantId, data) => async (dispatch) => {
  dispatch({ type: EDIT_PARTICIPANT_REQUEST })

  var formData = new FormData()

  formData.append('active', data.active)
  formData.append('category', data.category)
  formData.append('description', data.description)
  formData.append('participantImage', data.participantImage)
  formData.append('name', data.name)

  try {
    const res = await request({
      url: `${PARTICIPANTS_ENDPOINT}/${participantId}`,
      auth: true,
      method: 'PATCH',
      data: formData,
    })

    if (res.code) {
      dispatch({
        type: EDIT_PARTICIPANT_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: EDIT_PARTICIPANT_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: EDIT_PARTICIPANT_FAILED,
      payload: err,
    })
  }
}

export const deleteParticipant = (participantId) => async (dispatch) => {
  dispatch({ type: DELETE_PARTICIPANT_REQUEST })

  try {
    const res = await request({
      url: `${PARTICIPANTS_ENDPOINT}/${participantId}`,
      auth: true,
      method: 'DELETE',
    })

    if (res.code) {
      dispatch({
        type: DELETE_PARTICIPANT_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: DELETE_PARTICIPANT_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: DELETE_PARTICIPANT_FAILED,
      payload: err,
    })
  }
}
