import {
  ADD_CATEGORY_FAILED,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCEED,
  DELETE_CATEGORY_FAILED,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCEED,
  EDIT_CATEGORY_FAILED,
  EDIT_CATEGORY_REQUEST,
  EDIT_CATEGORY_SUCCEED,
  GET_CATEGORIES_LIST_FAILED,
  GET_CATEGORIES_LIST_REQUEST,
  GET_CATEGORIES_LIST_SUCCEED,
  GET_CATEGORY_FAILED,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCEED,
} from '../../ActionTypes'

import request from '../../../helpers/requestHelper'

export const CATEGORIES_ENDPOINT = '/categories'

export const addCategory = (data) => async (dispatch) => {
  dispatch({ type: ADD_CATEGORY_REQUEST })

  const formData = new FormData()

  formData.append('description', data.description)
  formData.append('name', data.name)

  if (data.categoryColor) formData.append('categoryColor', data.categoryColor)
  if (data.categoryTimeRemainingColor) formData.append('categoryTimeRemainingColor', data.categoryTimeRemainingColor)
  if (data.categoryImage) formData.append('categoryImage', data.categoryImage)

  try {
    const res = await request({
      url: `${CATEGORIES_ENDPOINT}`,
      auth: true,
      method: 'POST',
      data: formData,
    })
    if (res.code) {
      dispatch({
        type: ADD_CATEGORY_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: ADD_CATEGORY_SUCCEED,
        payload: { ...res, participantsNumber: 0 },
      })
    }
  } catch (err) {
    dispatch({
      type: ADD_CATEGORY_FAILED,
      payload: err,
    })
  }
}

export const getCategory = (categoryId) => async (dispatch) => {
  dispatch({ type: GET_CATEGORY_REQUEST })

  try {
    const res = await request({
      url: `${CATEGORIES_ENDPOINT}/${categoryId}`,
      auth: true,
      method: 'GET',
    })

    if (res.code) {
      dispatch({
        type: GET_CATEGORY_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: GET_CATEGORY_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: GET_CATEGORY_FAILED,
      payload: err,
    })
  }
}

export const getCategoriesList = (page) => async (dispatch) => {
  dispatch({ type: GET_CATEGORIES_LIST_REQUEST })

  try {
    const res = await request({
      url: page
        ? `${CATEGORIES_ENDPOINT}?page=${page}&limit=20`
        : `${CATEGORIES_ENDPOINT}?limit=20`,
      auth: true,
      method: 'GET',
    })

    if (res.code) {
      dispatch({
        type: GET_CATEGORIES_LIST_FAILED,
        payload: res,
      })
    } else {
      if (Array.isArray(res.results)) {
        res.results = await Promise.all(res.results.map(async (category) => {
          const participants = await request({
            url: `${CATEGORIES_ENDPOINT}/${category.id}/participants`,
            auth: true,
            method: 'GET',
          })
          return { ...category, participantsNumber: participants.length }
        }))
      }
      dispatch({
        type: GET_CATEGORIES_LIST_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: GET_CATEGORIES_LIST_FAILED,
      payload: err,
    })
  }
}

export const editCategory = (categoryId, data) => async (dispatch) => {
  dispatch({ type: EDIT_CATEGORY_REQUEST })

  var formData = new FormData()

  formData.append('active', data.active)
  formData.append('description', data.description)
  formData.append('categoryImage', data.categoryImage)
  formData.append('name', data.name)
  formData.append('categoryColor', data.categoryColor)
  formData.append('categoryTimeRemainingColor', data.categoryTimeRemainingColor)

  try {
    const res = await request({
      url: `${CATEGORIES_ENDPOINT}/${categoryId}`,
      auth: true,
      method: 'PATCH',
      data: formData,
    })

    if (res.code) {
      dispatch({
        type: EDIT_CATEGORY_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: EDIT_CATEGORY_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: EDIT_CATEGORY_FAILED,
      payload: err,
    })
  }
}

export const deleteCategory = (categoryId) => async (dispatch) => {
  dispatch({ type: DELETE_CATEGORY_REQUEST })

  try {
    const res = await request({
      url: `${CATEGORIES_ENDPOINT}/${categoryId}`,
      auth: true,
      method: 'DELETE',
    })

    if (res.code) {
      dispatch({
        type: DELETE_CATEGORY_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: DELETE_CATEGORY_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: DELETE_CATEGORY_FAILED,
      payload: err,
    })
  }
}
