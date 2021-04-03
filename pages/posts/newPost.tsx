import { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { LoadingState } from "../../interfaces";
import { createNewPost } from "../../store/actions";
import { useRouter } from "next/router";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 40, color: "grey" }} spin />
);

const NewPost: React.FC = () => {
  const dispatch = useDispatch();
  const [post, setPost] = useState({
    title: "",
    body: "",
  });
  const [warning, setWarning] = useState(false);
  const router = useRouter();

  const { loading, success, failed } = useSelector(
    ({ posts }: LoadingState) => ({
      loading: posts.currentState.loading,
      success: posts.currentState.success,
      failed: posts.currentState.failed,
    })
  );

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (post.title && post.body) {
      dispatch(createNewPost(post));
      setPost({
        title: "",
        body: "",
      });
      router.push("/");
    } else {
      setWarning(true);
      //   setTimeout(() => setWarning(false), 3000);
    }
  };

  const changeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPost((prev) => ({ ...prev, ...{ [e.target.name]: e.target.value } }));
  };

  return (
    <>
      {warning && !success && (
        <Alert
          message="You need to fill all fields to send"
          type="warning"
          banner
          closable
          showIcon
        />
      )}
      {success && (
        <Alert
          message="The post was successful"
          type="success"
          showIcon
          banner
          closable
        />
      )}
      <Form>
        <Title>Create new post</Title>
        <Input
          id="title"
          type="text"
          name="title"
          placeholder="Type post title"
          onChange={changeHandler}
          value={post.title}
        />
        <TextArea
          name="body"
          placeholder="Type post text"
          onChange={changeHandler}
          value={post.body}
        />
        <Loader>{loading && <Spin indicator={antIcon} />}</Loader>
        <Button onClick={submitHandler}>Create</Button>
      </Form>
    </>
  );
};

const Form = styled.form`
  min-width: 300px;
  max-width: 400px;
  height: 400px;
  margin: 50px auto;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 1.5rem;
  line-height: 20px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 5px 10px;
  height: 30px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  &:hover {
    box-shadow: 1px 0px 5px 5px rgba(0, 0, 0, 0.1);
  }
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

const Loader = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default NewPost;
