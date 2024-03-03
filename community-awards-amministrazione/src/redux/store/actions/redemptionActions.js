import {
  GET_REDEMPTIONS_LIST_REQUEST,
  GET_REDEMPTIONS_LIST_SUCCEED,
  GET_REDEMPTIONS_LIST_FAILED,
} from '../../ActionTypes';

import request from '../../../helpers/requestHelper';

export const getRedemptionsList = (page) => async (dispatch) => {
  dispatch({ type: GET_REDEMPTIONS_LIST_REQUEST });

  try {
    const res = await request({
      url: 'redemptions/manage?limit=100&populate=poapId',
      auth: true,
      method: 'GET',
    });

    if (res.code) {
      dispatch({
        type: GET_REDEMPTIONS_LIST_FAILED,
        payload: res,
      });
    } else {
      dispatch({
        type: GET_REDEMPTIONS_LIST_SUCCEED,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_REDEMPTIONS_LIST_FAILED,
      payload: err,
    });
  }
};
