export interface Post {
  body: string;
  id: number;
  title: string;
}

export interface SendPost {
  body: string;
  title: string;
}

export interface PostsState {
  posts: {
    allPosts: Post[];
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
