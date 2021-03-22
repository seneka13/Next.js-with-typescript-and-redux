import { useDispatch, useSelector } from "react-redux";
import { Post, PostsState } from "../interfaces";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { deletePost } from "../store/actions";

export default function AllPosts() {
  const posts = useSelector(({ posts }: PostsState) => posts.allPosts);
  const dispatch = useDispatch();
  return (
    <CardContainer>
      {posts.map((post: Post) => {
        return (
          <Card key={post.id}>
            <CardTitle>
              {post.title}
              <CardButton onClick={() => dispatch(deletePost(post.id))}>
                <Image
                  src="/close.svg"
                  alt="delete-cross"
                  height={15}
                  width={15}
                />
              </CardButton>
            </CardTitle>
            <CardBody>{post.body}</CardBody>
            <CardFooter>
              <Link href={`/posts/[id]`} as={`/posts/${post.id}`}>
                <a>Watch post</a>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </CardContainer>
  );
}

const Card = styled.div`
  width: 300px;
  min-height: 300px;
  border: 2px solid #f0f0f0;
  border-radius: 5px;
  transition: transform ease 0.4s;
  &:hover {
    transform: scale(1.03);
    cursor: pointer;
  }
`;

const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  min-height: 50px;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const CardBody = styled.div`
  padding: 10px;
  height: 65%;
  font-size: 1rem;
`;

const CardButton = styled.button`
  background: none;
  border: none;
  border-radius: 10px;
  &:hover {
    box-shadow: 1px 0px 5px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const CardFooter = styled.div`
  padding: 15px;
  height: 40px;
  width: 100%;
  text-align: end;
  font-size: 1rem;
  color: #1890ff;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
`;
