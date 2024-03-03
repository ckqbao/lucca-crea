import dayjs from 'dayjs'
import { createSlice } from '@reduxjs/toolkit'
import { PersistConfig, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { authApi } from '@/services/api/auth'
import { User } from '@/services/api/users'

import { RootState } from '../store'

type AuthReducerState = {
  user: User | null
  access: {
    token: string
    expires: string
  } | null
  refresh: {
    token: string
    expires: string
  } | null
}

const initialState: AuthReducerState = {
  user: null,
  access: null,
  refresh: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchPending, (_state, action) => {
        console.log('pending', action)
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.user
        state.access = action.payload.access
        state.refresh = action.payload.refresh
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
        state.user = null
        state.access = null
        state.refresh = null
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null
        state.access = null
        state.refresh = null
      })
  },
})

export const { logout } = authSlice.actions

export const selectAuthUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.access ? state.auth.access.token && dayjs(state.auth.access.expires).isAfter(dayjs()) : false

const persistConfig: PersistConfig<AuthReducerState> = {
  key: 'auth',
  storage,
}

const userReducer = persistReducer(persistConfig, authSlice.reducer)

export default userReducer
