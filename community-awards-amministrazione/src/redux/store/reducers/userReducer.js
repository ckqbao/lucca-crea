import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCEED,
  USER_LOGIN_FAILED,

  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCEED,
  USER_LOGOUT_FAILED,

  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_FAILED,
  USER_FORGOT_PASSWORD_SUCCEED,

  GET_USERS_LIST_REQUEST,
  GET_USERS_LIST_SUCCEED,
  GET_USERS_LIST_FAILED,

  ADD_USER_REQUEST,
  ADD_USER_SUCCEED,
  ADD_USER_FAILED,

  EDIT_USER_REQUEST,
  EDIT_USER_SUCCEED,
  EDIT_USER_FAILED,

  DELETE_USER_REQUEST,
  DELETE_USER_SUCCEED,
  DELETE_USER_FAILED,

  RESET_LOADING,

} from '../../ActionTypes';


const initialState ={
	errorMsg: null,
	successMsg: null,
	userDetails : null,
	usersList: [],
	isLoading: false,
	subLoading: true,
	total:0,
}


export default function userData(state = initialState, action){
	const {type, payload} = action;
	switch(type){
		case RESET_LOADING:
			return {
				...state,
				isLoading: false,
			};


		case USER_LOGIN_REQUEST:
			return {
				...state,
				isLoading:true,
				errorMsg:null,
				successMsg: null,
			};
		case USER_LOGOUT_REQUEST:
			return {
				...state,
				isLoading:true,
				errorMsg:null,
				successMsg: null,
			};
		case USER_FORGOT_PASSWORD_REQUEST:
			return {
				...state,
				isLoading:true,
				errorMsg:null,
				successMsg: null,
			};
		case GET_USERS_LIST_REQUEST:
			return {
				...state,
				subLoading:true,
				errorMsg:null,
				successMsg: null,
			};
		case ADD_USER_REQUEST:
			return {
				...state,
				isLoading:true,
				errorMsg:null,
				successMsg: null,
			};
		case EDIT_USER_REQUEST:
			return {
				...state,
				isLoading:true,
				errorMsg:null,
				successMsg: null,
			};
		case DELETE_USER_REQUEST:
			return {
				...state,
				isLoading:true,
				errorMsg:null,
				successMsg: null,
			};


		case USER_LOGIN_SUCCEED:
			return{
				...state,
				successMsg: 'Successfully Logged',
				userDetails: payload,
				isLoading: false
			};
		case USER_LOGIN_FAILED:
			return{
				...state,
				isLoading:false,
				userDetails:null,
				errorMsg:payload
			};


		case USER_LOGOUT_SUCCEED:
			return{
				...state,
				successMsg: 'Successfully Logged Out',
				userDetails: null,
				usersList:[],
			};
		case USER_LOGOUT_FAILED:
			return{
				...state,
				isLoading:false,
				errorMsg:payload
			};

		
		case USER_FORGOT_PASSWORD_SUCCEED:
			return{
				...state,
				successMsg: payload,
				userDetails: null,
				isLoading: false
			};
		case USER_FORGOT_PASSWORD_FAILED:
			return{
				...state,
				userDetails: null,
				isLoading:false,
				errorMsg:payload
			};


		case GET_USERS_LIST_SUCCEED:
			return{
				...state,
				successMsg: 'User List Fetched',
				usersList: payload.results && payload.results.length ? payload.results : [],
				subLoading: false,
				total: payload.totalResults,
			};
		case GET_USERS_LIST_FAILED:
			return{
				...state,
				usersList: [],
				subLoading:false,
				errorMsg:payload,
				total:0
			};


		case ADD_USER_SUCCEED:
			return{
				...state,
				successMsg: 'User Added',
				usersList: state.total%5 !== 0 ? state.usersList.concat(payload) : state.usersList,
				isLoading: false,
				total:state.total +1,
			};
		case ADD_USER_FAILED:
			return{
				...state,
				isLoading:false,
				errorMsg:payload
			};


		case EDIT_USER_SUCCEED:
			let users = state.usersList;
      		let userIndex = state.usersList.findIndex(item => item.id === payload.id);
      		
      		users.splice(userIndex, 1, { ...state.usersList[userIndex], ...payload })

			return{
				...state,
				successMsg: 'User Edited',
				usersList: users,
				isLoading: false
			};
		case EDIT_USER_FAILED:
			return{
				...state,
				isLoading:false,
				errorMsg:payload
			};


		case DELETE_USER_SUCCEED:
			return{
				...state,
				successMsg: 'User Deleted',
				usersList: state.usersList.filter((el)=>el.id !== payload),
				isLoading: false,
				total:state.total -1,
			};
		case DELETE_USER_FAILED:
			return{
				...state,
				isLoading:false,
				errorMsg:payload
			};

		default:
			return state;
	}
}