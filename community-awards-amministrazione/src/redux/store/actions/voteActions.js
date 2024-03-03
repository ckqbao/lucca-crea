
import request from '../../../helpers/requestHelper'
import { ADD_VOTE_FAILED, ADD_VOTE_REQUEST, ADD_VOTE_SUCCEED, GET_VOTES_LIST_FAILED, GET_VOTES_LIST_REQUEST, GET_VOTES_LIST_SUCCEED } from '../../ActionTypes'

export const VOTES_ENDPOINT = '/votes'

export const addVote = (data) => async (dispatch) => {
  dispatch({ type: ADD_VOTE_REQUEST })

  const formData = new FormData()

  formData.append('categoryId', data.categoryId)
  formData.append('participantId', data.participantId)
  formData.append('externalUserId', (Math.random() + 1).toString(36).substring(7)) // TODO: replace by real external user id

  try {
    const res = await request({
      url: `${VOTES_ENDPOINT}/testvote`,
      auth: true,
      method: 'POST',
      data: formData,
    })
    if (res.code) {
      dispatch({
        type: ADD_VOTE_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: ADD_VOTE_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: ADD_VOTE_FAILED,
      payload: err,
    })
  }
}

export const getVotesList = () => async (dispatch) => {
  dispatch({ type: GET_VOTES_LIST_REQUEST })

  try {
    const res = await request({
      url: `${VOTES_ENDPOINT}/get/results`,
      auth: true,
      method: 'GET',
    })

    if (res.code) {
      dispatch({
        type: GET_VOTES_LIST_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: GET_VOTES_LIST_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: GET_VOTES_LIST_FAILED,
      payload: err,
    })
  }
}