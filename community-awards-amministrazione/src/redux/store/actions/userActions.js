import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCEED,
  USER_LOGIN_FAILED,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCEED,
  USER_LOGOUT_FAILED,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_FAILED,
  USER_FORGOT_PASSWORD_SUCCEED,
  GET_USERS_LIST_REQUEST,
  GET_USERS_LIST_SUCCEED,
  GET_USERS_LIST_FAILED,
  ADD_USER_REQUEST,
  ADD_USER_SUCCEED,
  ADD_USER_FAILED,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCEED,
  EDIT_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCEED,
  DELETE_USER_FAILED,
} from '../../ActionTypes'

import request from '../../../helpers/requestHelper'

export const userLogin = (Data, isRemember) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST })

  var data = new FormData()

  data.append('email', Data.email)
  data.append('password', Data.password)
  // data.append('fromweb', Data.fromweb);

  try {
    const res = await request({
      url: `/auth/login`,
      auth: false,
      method: 'POST',
      data: data,
    })

    if (res.user && res.access?.token) {
      if (isRemember) {
        localStorage.setItem('token', res.access.token)
        localStorage.setItem('name', res.user.name)
        localStorage.setItem('surname', res.user.surname)
        localStorage.setItem('avatar', res.user.avatar)
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('surname')
        localStorage.removeItem('avatar')
      }

      dispatch({
        type: USER_LOGIN_SUCCEED,
        payload: res,
      })
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('surname')
      localStorage.removeItem('avatar')
      dispatch({
        type: USER_LOGIN_FAILED,
        payload: res ? res : null,
      })
    }

    return res
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: err ? err : null,
    })
  }
}

export const sendForgotPasswordLink = (Data) => async (dispatch) => {
  dispatch({ type: USER_FORGOT_PASSWORD_REQUEST })

  var data = new FormData()

  data.append('email', Data.email)

  try {
    const res = await request({
      url: `/auth/forgot-password`,
      auth: false,
      method: 'POST',
      data: data,
    })

    if (res.code) {
      dispatch({
        type: USER_FORGOT_PASSWORD_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: USER_FORGOT_PASSWORD_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: USER_FORGOT_PASSWORD_FAILED,
      payload: err ? err : null,
    })
  }
}

export const userLogout = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOGOUT_REQUEST })

  const data = new FormData()

  data.append('refreshToken', getState().user.userDetails?.refresh?.token)

  try {
    const res = await request({
      url: `/auth/logout`,
      auth: true,
      method: 'POST',
      data: data,
    })
    if (res.code) {
      dispatch({
        type: USER_LOGOUT_FAILED,
        payload: res,
      })
    } else {
      localStorage.removeItem('name')
      localStorage.removeItem('surname')
      localStorage.removeItem('token')
      localStorage.removeItem('avatar')

      dispatch({ type: USER_LOGOUT_SUCCEED })
      return true
    }
  } catch (err) {
    dispatch({
      type: USER_LOGOUT_FAILED,
      payload: err ? err : null,
    })
  }
}

export const getUsersList = (page) => async (dispatch) => {
  dispatch({ type: GET_USERS_LIST_REQUEST })

  try {
    const res = await request({
      url: `/users?page=${page}&limit=20`,
      auth: true,
      method: 'GET',
    })

    if (res.code) {
      dispatch({
        type: GET_USERS_LIST_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: GET_USERS_LIST_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: GET_USERS_LIST_FAILED,
      payload: err ? err : null,
    })
  }
}

export const addUser = (Data) => async (dispatch) => {
  dispatch({ type: ADD_USER_REQUEST })

  var data = new FormData()

  data.append('email', Data.email)
  data.append('password', Data.password)
  data.append('name', Data.name)
  data.append('surname', Data.surname)
  data.append('role', Data.role)

  if (Data.avatar) data.append('avatar', Data.avatar)

  try {
    const res = await request({
      url: `/users`,
      auth: true,
      method: 'POST',
      data: data,
    })
    if (res.code) {
      dispatch({
        type: ADD_USER_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: ADD_USER_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: ADD_USER_FAILED,
      payload: err,
    })
  }
}

export const editUser = (Data) => async (dispatch) => {
  dispatch({ type: EDIT_USER_REQUEST })

  var data = new FormData()

  data.append('email', Data.email)
  data.append('name', Data.name)
  data.append('surname', Data.surname)
  data.append('role', Data.role)
  data.append('active', Data.active)
  data.append('avatar', Data.avatar)

  if (Data.password) data.append('password', Data.password)

  try {
    const res = await request({
      url: `/users/${Data.id}`,
      auth: true,
      method: 'PATCH',
      data: data,
    })

    if (res.code) {
      dispatch({
        type: EDIT_USER_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: EDIT_USER_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: EDIT_USER_FAILED,
      payload: err,
    })
  }
}

export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST })

  try {
    const res = await request({
      url: `/users/${id}`,
      auth: true,
      method: 'DELETE',
    })

    if (res.code) {
      dispatch({
        type: DELETE_USER_FAILED,
        payload: res,
      })
    } else {
      dispatch({
        type: DELETE_USER_SUCCEED,
        payload: res,
      })
    }
  } catch (err) {
    dispatch({
      type: DELETE_USER_FAILED,
      payload: err,
    })
  }
}
