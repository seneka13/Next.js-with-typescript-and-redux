import { SyntheticEvent, useState } from "react";
import { Modal, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updatePost } from "../store/actions";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { PostPageProps } from "../interfaces";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 40, color: "grey" }} spin />
);

export const EditModal: NextPage<PostPageProps> = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const dispatch = useDispatch();
  const [post, setPost] = useState({
    title: data.title,
    body: data.body,
  });

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (post.title && post.body) {
      dispatch(updatePost(data.id, post));
      setPost({
        title: "",
        body: "",
      });
      setIsModalVisible(false);
      router.push("/");
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
      <Button
        type="primary"
        onClick={showModal}
        style={{ backgroundColor: "#000", borderColor: "#000" }}
      >
        Edit Post
      </Button>
      <Modal
        title="Edit Post"
        visible={isModalVisible}
        onOk={submitHandler}
        onCancel={handleCancel}
      >
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
          placeholder="Type post body"
          onChange={changeHandler}
          value={post.body}
        />
      </Modal>
    </>
  );
};

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
