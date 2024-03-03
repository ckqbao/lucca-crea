import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import { api } from '@/api'

import authReducer from './reducers/authReducer'
import categoryReducer from './reducers/categoryReducer'
import voteReducer from './reducers/voteReducer'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    category: categoryReducer,
    vote: voteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [],
      },
    }).concat([api.middleware]),
  devTools: import.meta.env.NODE_ENV !== 'production',
})

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector
