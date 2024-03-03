import {
  GET_POAPS_LIST_REQUEST,
  GET_POAPS_LIST_SUCCEED,
  GET_POAPS_LIST_FAILED,
  ADD_POAP_REQUEST,
  ADD_POAP_SUCCEED,
  ADD_POAP_FAILED,
  EDIT_POAP_REQUEST,
  EDIT_POAP_SUCCEED,
  EDIT_POAP_FAILED,
  DELETE_POAP_REQUEST,
  DELETE_POAP_SUCCEED,
  DELETE_POAP_FAILED,
} from '../../ActionTypes';

const initialState = {
  errorMsg: null,
  successMsg: null,
  poapsList: [],
  isLoading: false,
  subLoading: true,
  total: 0,
};

export default function userData(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POAPS_LIST_REQUEST:
      return {
        ...state,
        subLoading: true,
        errorMsg: null,
        successMsg: null,
      };
    case ADD_POAP_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
        successMsg: null,
      };
    case EDIT_POAP_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
        successMsg: null,
      };
    case DELETE_POAP_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
        successMsg: null,
      };

    case GET_POAPS_LIST_SUCCEED:
      return {
        ...state,
        successMsg: 'Poap List Fetched',
        poapsList:
          payload.results && payload.results.length ? payload.results : [],
        subLoading: false,
        total: payload.totalResults,
      };
    case GET_POAPS_LIST_FAILED:
      return {
        ...state,
        poapsList: [],
        subLoading: false,
        errorMsg: payload,
        total: 0,
      };

    case ADD_POAP_SUCCEED:
      return {
        ...state,
        successMsg: 'Poap Added',
        poapsList:
          state.total % 5 !== 0
            ? state.poapsList.concat(payload)
            : state.poapsList,
        isLoading: false,
        total: state.total + 1,
      };
    case ADD_POAP_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };

    case EDIT_POAP_SUCCEED:
      let poaps = state.poapsList;
      let poapIndex = state.poapsList.findIndex(
        (item) => item.id === payload.id
      );

      poaps.splice(poapIndex, 1, {
        ...state.poapsList[poapIndex],
        ...payload,
      });

      return {
        ...state,
        successMsg: 'Poap Edited',
        poapsList: poaps,
        isLoading: false,
      };
    case EDIT_POAP_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };

    case DELETE_POAP_SUCCEED:
      return {
        ...state,
        successMsg: 'Poap Deleted',
        poapsList: state.poapsList.filter((el) => el.id !== payload),
        isLoading: false,
        total: state.total - 1,
      };
    case DELETE_POAP_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };

    default:
      return state;
  }
}
