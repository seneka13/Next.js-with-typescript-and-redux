import axios from "axios";
import { NextPageContext, NextPage } from "next";
import { Divider, Typography } from "antd";
import styled from "styled-components";
import { PostPageProps } from "../../interfaces";
import MockComments from "../../components/MockComments";

const { Title, Paragraph, Text } = Typography;

const PostDetail: NextPage<PostPageProps> = ({ data }) => {
  return (
    <>
      <Title style={{ textAlign: "center" }}>{data.title}</Title>
      <Divider>Description</Divider>
      <Paragraph>
        <blockquote>
          <Text>{data.body}</Text>
        </blockquote>
      </Paragraph>
      <MockComments />
    </>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { data } = await axios.get(
    `https://simple-blog-api.crew.red/posts/${ctx.query.postDetail}?_embed=comments`
  );
  return {
    props: {
      data,
    },
  };
};

export default PostDetail;
