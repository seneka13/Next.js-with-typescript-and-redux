import { wrapper } from "../store/store";
import { GET_ALL_POSTS } from "../store/actionTypes";
import axios from "axios";
import AllPosts from "../components/allPosts";

export default function Home() {
  return (
    <AllPosts/>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const {data} = await axios.get(`https://jsonplaceholder.typicode.com/posts`);;
    store.dispatch({ type: GET_ALL_POSTS, payload: data });
  }
);
