import { RESET_LOADING } from '../../ActionTypes';


export const resetLoading=()=> async dispatch=>{
  dispatch({type:RESET_LOADING});
}