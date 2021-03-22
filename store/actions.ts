import axios from "axios";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { SendPost } from "../interfaces";
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
  dispatch({ type: types.LOADING });
  try {
    const { data } = await axios.delete(
      `https://simple-blog-api.crew.red/posts/${postId}`
    );
    window.location.reload(); // Ужасный способ актуализировать информацию, но по времени не успел
  } catch (error) {
    dispatch({ type: types.FAILED, error });
  }
};
