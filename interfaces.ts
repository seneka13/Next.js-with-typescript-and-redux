export interface Post {
  body: string;
  id: number;
  title: string;
}

export interface PostsState {
  posts: Post[];
}

