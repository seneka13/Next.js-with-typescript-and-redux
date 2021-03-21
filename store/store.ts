import { createStore, applyMiddleware, combineReducers, AnyAction } from "redux";
import { MakeStore, createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { PostsState } from "../interfaces";
import reducers from "./reducers";

const combinedReducer = combineReducers(reducers)



const reducer = (state:PostsState | any, action:AnyAction) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      }
      if (state.posts.length) nextState.posts = state.posts 
      return nextState
    } else {
      return combinedReducer(state, action)
    }
  }

export const makeStore: MakeStore = (context: Context) =>
  createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export const wrapper = createWrapper(makeStore, { debug: true });
