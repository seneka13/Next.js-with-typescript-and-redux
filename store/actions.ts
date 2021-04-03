import axios from "axios";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { SendComment, SendPost } from "../interfaces";
import * as types from "./actionTypes";

export const createNewPost = (postBody: SendPost) => async (
  dispatch: ThunkDispatch<null, void, AnyAction>
) => {
  dispatch({ type: types.LOADING });
  try {
    const { data } = await axios.post(
      "https://simple-blog-api.crew.red/posts",
      postBody
    );
    dispatch({ type: types.SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.FAILED, error });
  }
};

export const deletePost = (postId: number) => async (
  dispatch: ThunkDispatch<null, void, AnyAction>
) => {
  try {
    const { data } = await axios.delete(
      `https://simple-blog-api.crew.red/posts/${postId}`
    );
    dispatch({ type: types.POST_DELETE, postId });
  } catch (error) {
    dispatch({ type: types.FAILED, error });
  }
};

export const updatePost = (postId: number, postBody: SendPost) => async (
  dispatch: ThunkDispatch<null, void, AnyAction>
) => {
  console.log(postId, postBody);
  try {
    const { data } = await axios.patch(
      `https://simple-blog-api.crew.red/posts/${postId}`,
      postBody
    );
    dispatch({ type: types.POST_UPDATE, postId, postBody });
  } catch (error) {
    dispatch({ type: types.FAILED, error });
  }
};

export const sendComment = (postBody: SendComment) => async (
  dispatch: ThunkDispatch<null, void, AnyAction>
) => {
  dispatch({ type: types.LOADING });
  try {
    const { data } = await axios.post(
      "https://bloggy-api.herokuapp.com/comments",
      postBody
    );
    dispatch({ type: types.POST_COMMENT, payload: data });
  } catch (error) {
    dispatch({ type: types.FAILED, error });
  }
};

export const getComment = () => async (
  dispatch: ThunkDispatch<null, void, AnyAction>
) => {
  try {
    const { data } = await axios.get(
      "https://bloggy-api.herokuapp.com/comments"
    );
    dispatch({ type: types.GET_COMMENT, payload: data });
  } catch (error) {}
};
