import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { Post } from "../../interfaces";
import * as types from "../actionTypes";
import stateCreator from "./stateCreator";

const initialState = {
  currentState: {
    success: false,
    loading: false,
    failed: false,
    error: "",
  },
  allPosts: [],
  comments: [],
};
export const postReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case types.GET_ALL_POSTS:
      return { ...state, allPosts: [...action.payload] };
    case types.LOADING:
      return { ...state, currentState: stateCreator("loading") };
    case types.SUCCESS:
      return {
        ...state,
        currentState: stateCreator("success"),
        allPosts: [...state.allPosts, action.payload],
      };
    case types.POST_DELETE:
      return {
        ...state,
        allPosts: [
          ...state.allPosts.filter(
            (post: Post): boolean => post.id !== action.postId
          ),
        ],
      };
    case types.POST_UPDATE:
      return {
        ...state,
        allPosts: [
          ...state.allPosts.map((post: Post) => {
            if (post.id === action.postId) {
              return { ...post, ...action.postBody };
            }
            return post;
          }),
        ],
      };

    case types.GET_COMMENT:
      return { ...state, comments: [...action.payload] };
    case types.POST_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };
    case types.FAILED:
      return { ...state, currentState: stateCreator("failed", action.error) };
    default:
      return state;
  }
};
