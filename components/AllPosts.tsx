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
<div>
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
            <CardBody>{post?.body}</CardBody>
            <CardFooter>
              <Link href={`/posts/[id]`} as={`/posts/${post.id}`}>
                <a>Watch post</a>
              </Link>
            </CardFooter>
          </Card>
          </div>
        );
      })}
    </CardContainer>
   
  );
}

const Card = styled.div`
  width: 300px;
  min-height: 350px;
  border: 2px solid #f0f0f0;
  border-radius: 5px;
  transition: transform ease 0.4s;
  word-wrap: break-word;
  &:hover {
    transform: scale(1.03);
    cursor: pointer;
  }
`;

const CardTitle = styled.div`
  padding: 10px;
  min-height: 50px;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  font-size: 1.1rem;
  font-weight: 600;
  position: relative;
  word-wrap: break-word;
`;

const CardBody = styled.div`
  padding: 10px;
  min-height: 250px;
  font-size: 1rem;
`;

const CardButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.85);
  border: 1px solid #000;
  border-radius: 50%;
  position: absolute;
  right: -15px;
  top: -10px;
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
  color: #777;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
`;
