import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { api } from '@/api'

const categoryAdapter = createEntityAdapter({ selectId: (category) => category.id })
const categorySelectors = categoryAdapter.getSelectors(state => state.category.categoriesList)

const initialState = {
  categoriesList: categoryAdapter.getInitialState()
}

const categorySlice = createSlice({
  name: 'categoryState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getCategoriesList.matchFulfilled, (state, { payload }) => {
      categoryAdapter.setAll(state.categoriesList, payload.results)
    })
  },
})

export const selectCategories = categorySelectors.selectAll
export const selectCategoryById = categorySelectors.selectById

const categoryReducer = categorySlice.reducer

export default categoryReducer
