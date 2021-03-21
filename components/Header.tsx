import Link from "next/link";
import { PageHeader } from "antd";
import styled from "styled-components";

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Logo>
        <Link href="/">
          <a>Post Blog</a>
        </Link>
      </Logo>
      <Link href="/post/newPost">
        <StyledLink>Create Post</StyledLink>
      </Link>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  margin: 0 auto;
  padding: 0px 30px;
  height: 70px;
  background: #fff;
  border: 2px solid rgb(235, 237, 240);
`;
const Logo = styled.span`
  display: flex;
  justfy-content: center;
  align-items: center;
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.85);
`;

const StyledLink = styled.a`
  display: flex;
  justfy-content: center;
  align-items: center;
  margin-left: 50px;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.85);
`;

export default Header;
