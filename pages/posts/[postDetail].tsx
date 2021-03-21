import axios from "axios";
import { NextPageContext, NextPage } from "next";
import { Divider, Typography } from 'antd';
import styled from "styled-components";
import { PostPageProps } from "../../interfaces";

const { Title, Paragraph, Text, Link } = Typography;

const PostDetail: NextPage<PostPageProps> = ({ data }) => {
  console.log(data);
  return (
    <>
      <Title>{data.title}</Title>
      <Divider>Description</Divider>
      <Paragraph><Text>{data.body}</Text></Paragraph>
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
