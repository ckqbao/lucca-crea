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

import request from '../../../helpers/requestHelper';

export const getPoapsList = (page) => async (dispatch) => {
  dispatch({ type: GET_POAPS_LIST_REQUEST });

  try {
    const res = await request({
      url: page ? `/poaps?page=${page}&limit=20` : `/poaps?limit=100`,
      auth: true,
      method: 'GET',
    });

    if (res.code) {
      dispatch({
        type: GET_POAPS_LIST_FAILED,
        payload: res,
      });
    } else {
      dispatch({
        type: GET_POAPS_LIST_SUCCEED,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_POAPS_LIST_FAILED,
      payload: err,
    });
  }
};

export const addPoap = (Data) => async (dispatch) => {
  dispatch({ type: ADD_POAP_REQUEST });

  var data = new FormData();

  data.append('name', Data.name);
  data.append('startDate', Data.startDate);
  data.append('endDate', Data.endDate);
  data.append('description', Data.description);
  data.append('isPoap', Data.isPoap);
  data.append('isRedeemable', Data.isRedeemable);
  data.append('poapId', Data.poapId);
  data.append('redemptionCode', Data.redemptionCode);
  data.append('image', Data.image);
  data.append('fallbackImage', Data.fallbackImage);

  try {
    const res = await request({
      url: `/poaps`,
      auth: true,
      method: 'POST',
      data: data,
    });

    if (res.code) {
      dispatch({
        type: ADD_POAP_FAILED,
        payload: res,
      });
    } else {
      dispatch({
        type: ADD_POAP_SUCCEED,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: ADD_POAP_FAILED,
      payload: err,
    });
  }
};

export const editPoap = (Data) => async (dispatch) => {
  dispatch({ type: EDIT_POAP_REQUEST });

  var data = new FormData();

  data.append('name', Data.name);
  data.append('startDate', Data.startDate);
  data.append('endDate', Data.endDate);
  data.append('description', Data.description);
  data.append('isPoap', Data.isPoap);
  data.append('isRedeemable', Data.isRedeemable);
  data.append('poapId', Data.poapId);
  data.append('redemptionCode', Data.redemptionCode);
  data.append('image', Data.image);
  data.append('fallbackImage', Data.fallbackImage);

  try {
    const res = await request({
      url: `poaps/${Data.id}`,
      auth: true,
      method: 'PATCH',
      data: data,
    });

    if (res.code) {
      dispatch({
        type: EDIT_POAP_FAILED,
        payload: res,
      });
    } else {
      dispatch({
        type: EDIT_POAP_SUCCEED,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: EDIT_POAP_FAILED,
      payload: err,
    });
  }
};

export const deletePoap = (id) => async (dispatch) => {
  dispatch({ type: DELETE_POAP_REQUEST });

  try {
    const res = await request({
      url: `poaps/${id}`,
      auth: true,
      method: 'DELETE',
    });

    if (res.code) {
      dispatch({
        type: DELETE_POAP_FAILED,
        payload: res,
      });
    } else {
      dispatch({
        type: DELETE_POAP_SUCCEED,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: DELETE_POAP_FAILED,
      payload: err,
    });
  }
};
