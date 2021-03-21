import { HYDRATE } from "next-redux-wrapper";
import { combineReducers, AnyAction } from "redux";
import * as types from "./actionTypes";

// COUNTER REDUCER
const postReducer = (state = [], action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return  [...state, ...action.payload ];
    case types.GET_ALL_POSTS:
      return [ ...state, ...action.payload ];
    default:
      return state;
  }
};

const initialState = {};

const createPostReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.CREATE_POST:
      return state;
    case types.CREATE_LOADING:
      return state;
    case types.CREATE_SUCCESS:
      return state;
    case types.CREATE_FAILED:
      return 0;
    default:
      return state;
  }
};

 const reducers = {
  posts: postReducer,
  createPost: createPostReducer,
};

export default reducers