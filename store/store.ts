import {
  createStore,
  applyMiddleware,
  combineReducers,
  AnyAction,
} from "redux";
import { MakeStore, createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { PostsState } from "../interfaces";
import { postReducer } from "./reducers/postReducer";

const combinedReducer = combineReducers({
  posts: postReducer,
});

const reducer = (state: PostsState | any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.posts.allPosts.length > 0) {
      nextState.posts.allPosts = state.posts.allPosts;
    }
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore: MakeStore = (context: Context) => {
  return createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};

export const wrapper = createWrapper(makeStore, { debug: true });
