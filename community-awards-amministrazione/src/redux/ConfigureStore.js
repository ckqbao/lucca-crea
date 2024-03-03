import { configureStore } from '@reduxjs/toolkit'

import category from './store/reducers/categoryReducer'
import participant from './store/reducers/participantReducer'
import user from './store/reducers/userReducer'
import vote from './store/reducers/voteReducer'

const reducer = {
  category,
  participant,
  user,
  vote,
}

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})
