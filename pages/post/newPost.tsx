import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const NewPost: React.FC = () => {
  const [input, setinput] = useState("");
  const changeHandler = (e) => {
    setinput(e.target.value);
  };
  const handler = async (e) => {
    e.preventDefault();

    let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: input,
        body: "new post by",
        userId:1,
      }),
    });

    let result = await response.json();

    console.log(result);
  };

  return (
    <div>
      <Form onSubmit={handler}>
        <Title>Create new post</Title>
        <Input
          id="title"
          type="text"
          name="title"
          placeholder="Type post title"
          onChange={changeHandler}
          value={input}
        />
        <TextArea name="body" placeholder="Type post text" />
        <Button>Create</Button>
      </Form>
    </div>
  );
};

const Form = styled.form`
  width: 350px;
  heigth: auto;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`;

const Title = styled.h2`
  margin-bottom: 15px;
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
  min-height: 70px;
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
  height: 40px;
  font-size: 1.2rem;
  background-color: #15171a;
  color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 1px;
  transition: transform ease 0.4s;
  &:hover {
    box-shadow: 1px 0px 5px 5px rgba(0, 0, 0, 0.1);
  }
  &:active {
    transform: scale(0.95);
    box-shadow: 1px 0px 5px 5px rgba(0, 0, 0, 0.1);
  }
`;

export default NewPost;
