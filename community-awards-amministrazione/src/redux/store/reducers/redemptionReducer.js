import {
  GET_REDEMPTIONS_LIST_REQUEST,
  GET_REDEMPTIONS_LIST_SUCCEED,
  GET_REDEMPTIONS_LIST_FAILED,
} from '../../ActionTypes';

const initialState = {
  errorMsg: null,
  successMsg: null,
  redemptionsList: [],
  isLoading: false,
  subLoading: true,
  total: 0,
};

export default function userData(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_REDEMPTIONS_LIST_REQUEST:
      return {
        ...state,
        subLoading: true,
        errorMsg: null,
        successMsg: null,
      };

    case GET_REDEMPTIONS_LIST_SUCCEED:
      return {
        ...state,
        successMsg: 'Redemption List Fetched',
        redemptionsList:
          payload.results && payload.results.length ? payload.results : [],
        subLoading: false,
        total: payload.totalResults,
      };
    case GET_REDEMPTIONS_LIST_FAILED:
      return {
        ...state,
        redemptionsList: [],
        subLoading: false,
        errorMsg: payload,
        total: 0,
      };

      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };

    default:
      return state;
  }
}
