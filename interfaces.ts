export interface Post {
  body: string;
  id: number;
  title: string;
}

export interface SendPost {
  body: string;
  title: string;
}

export interface CommentProps {
  id?: number;
  postId?: number;
  body: string;
}

export interface SendComment {
  postId: number;
  body: string;
}

export interface PostsState {
  posts: {
    allPosts: Post[];
    comments: CommentProps[];
  };
}

interface PostPageData {
  body: string;
  comments: [];
  id: number;
  title: string;
}

export interface PostPageProps {
  data: PostPageData;
}

export interface LoadingState {
  posts: {
    currentState: {
      loading: boolean;
      success: boolean;
      failed: boolean;
      error: string;
    };
  };
}
