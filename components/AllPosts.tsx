import { useSelector } from "react-redux";
import { Card } from "antd";
import { Post } from "../interfaces";
import styled from "styled-components";

export default function AllPosts() {
  const posts = useSelector((state) => state.posts);
  return (
    <CardContainer>
      {posts.map((post: Post) => {
        return (
          <Card
            title={post.title}
            extra={<a href="#">See...</a>}
            style={{ width: 300, minHeight:300, border:"2px solid #f0f0f0"}}
            key={post.id}
          >
            {post.body}
          </Card>
        );
      })}
    </CardContainer>
  );
}

const CardContainer = styled.div`
    display: grid;
    grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));
    grid-gap:20px;
`