import {
  createEntityAdapter,
  createReducer,
  createSelector,
} from "@reduxjs/toolkit";

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
} from "../../ActionTypes";

const categoriesAdapter = createEntityAdapter({
  selectId: (category) => category.id,
});
const categoriesSelectors = categoriesAdapter.getSelectors(
  (state) => state.category.categoriesList
);

const initialState = {
  categoriesList: categoriesAdapter.getInitialState(),
  error: null,
  loading: {
    add: false,
    get: false,
    list: false,
    edit: false,
    delete: false,
  },
  total: 0,
};

const categoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_CATEGORY_REQUEST, (state, action) => {
      state.loading.add = true;
    })
    .addCase(ADD_CATEGORY_SUCCEED, (state, action) => {
      const { payload } = action;
      if (state.total % 5 !== 0) {
        categoriesAdapter.addOne(state.categoriesList, payload);
      }
      state.loading.add = false;
      state.total++;
    })
    .addCase(ADD_CATEGORY_FAILED, (state, action) => {
      state.error = action.payload;
      state.loading.add = false;
    })
    .addCase(GET_CATEGORY_REQUEST, (state, action) => {
      state.loading.get = true;
    })
    .addCase(GET_CATEGORY_SUCCEED, (state, action) => {
      const { payload } = action;
      categoriesAdapter.setOne(state.categoriesList, payload);
      state.loading.get = false;
      state.total++;
    })
    .addCase(GET_CATEGORY_FAILED, (state, action) => {
      state.error = action.payload;
      state.loading.get = false;
    })
    .addCase(GET_CATEGORIES_LIST_REQUEST, (state, action) => {
      state.loading.list = true;
    })
    .addCase(GET_CATEGORIES_LIST_SUCCEED, (state, action) => {
      const { payload } = action;
      categoriesAdapter.setAll(state.categoriesList, payload.results ?? []);
      state.loading.list = false;
      state.total = payload.totalResults;
    })
    .addCase(GET_CATEGORIES_LIST_FAILED, (state, action) => {
      state.error = action.payload;
      state.loading.list = false;
    })
    .addCase(EDIT_CATEGORY_REQUEST, (state, action) => {
      state.loading.edit = true;
    })
    .addCase(EDIT_CATEGORY_SUCCEED, (state, action) => {
      const { payload } = action;
      categoriesAdapter.updateOne(state.categoriesList, {
        id: payload.id,
        changes: payload,
      });
      state.loading.edit = false;
    })
    .addCase(EDIT_CATEGORY_FAILED, (state, action) => {
      state.error = action.payload;
      state.loading.edit = false;
    })
    .addCase(DELETE_CATEGORY_REQUEST, (state, action) => {
      state.loading.delete = true;
    })
    .addCase(DELETE_CATEGORY_SUCCEED, (state, action) => {
      categoriesAdapter.removeOne(state.categoriesList, action.payload);
      state.loading.delete = false;
    })
    .addCase(DELETE_CATEGORY_FAILED, (state, action) => {
      state.error = action.payload;
      state.loading.delete = false;
    });
});

export const selectCategories = categoriesSelectors.selectAll;
export const selectCategoryById = categoriesSelectors.selectById;
export const selectCategoryByIds = createSelector(
  (state) => state.category.categoriesList.entities,
  (_, selectingIds) => selectingIds,
  (categories, selectingIds) =>
    selectingIds
      .map((categoryId) => categories[categoryId])
      .filter((category) => !!category)
);

export default categoryReducer;
