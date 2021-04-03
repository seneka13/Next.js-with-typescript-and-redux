import axios from "axios";
import { NextPageContext, NextPage } from "next";
import { Divider, Typography } from "antd";
import { PostPageProps, CommentProps, PostsState } from "../../interfaces";
import styled from "styled-components";
import MockComments from "../../components/MockComments";
import { EditModal } from "../../components/EditModal";
import { SyntheticEvent, useEffect, useState } from "react";
import { getComment, sendComment } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const { Title, Paragraph, Text } = Typography;

const PostDetail: NextPage<PostPageProps> = ({ data }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
    const commentsArr = useSelector(({posts}: PostsState)=> posts.comments)
    console.log(commentsArr)
  useEffect(() => {
    dispatch(getComment());
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(sendComment({ postId: data.id, body: comment }));
  };
  return (
    <>
      <Title style={{ textAlign: "center" }}>{data.title}</Title>
      <EditModal data={data} />
      <Divider>Description</Divider>
      <Paragraph>
        <blockquote>
          <Text>{data.body}</Text>
        </blockquote>
      </Paragraph>
      {commentsArr?.length > 0 &&
        commentsArr.map((item: CommentProps) => {
          console.log(item);
          return <MockComments commentBody = {item}/>;
        })}

      <Form>
        <TextArea
          name="body"
          placeholder="Type post text"
          onChange={changeHandler}
          value={comment}
        />
        <Button onClick={submitHandler}>Send Comment</Button>
      </Form>
    </>
  );
};

const Form = styled.form`
  min-width: 300px;
  max-width: 400px;
  margin: 50px auto;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  margin-bottom: 15px;
  padding: 5px 10px;
  min-height: 100px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  resize: none;
  &:hover {
    box-shadow: 1px 0px 5px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  font-size: 1.4rem;
  background-color: #050403;
  color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  transition: transform ease 0.4s;
  &:hover {
    box-shadow: 1px 0px 5px 5px rgba(0, 0, 0, 0.1);
  }
  &:active {
    transform: scale(0.95);
    box-shadow: 1px 0px 5px 5px rgba(0, 0, 0, 0.1);
  }
`;

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
