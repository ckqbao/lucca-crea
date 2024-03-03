import { createSlice } from '@reduxjs/toolkit'

import { api } from '@/api'
import Cookies from 'js-cookie'

const initialState = {
  user: null,
  access: null,
  refresh: null,
  tokenlc: null,
}

const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.user = payload.user
      state.access = payload.access
      state.refresh = payload.refresh
      state.tokenlc = payload.token
      
      Cookies.set('awardcookie', payload.token + '|' + payload.user , { expires: 30, path: '' })
    })
  },
})

const authReducer = authSlice.reducer

export const selectAuthUser = (state) => state.auth.user

export default authReducer
