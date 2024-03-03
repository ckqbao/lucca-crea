import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  votesList: []
}

const voteSlice = createSlice({
  name: 'voteState',
  initialState,
  reducers: {},
})

const voteReducer = voteSlice.reducer

export default voteReducer
