import Head from "next/head";
import styled from "styled-components";
import Header from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Post Blog</title>
      </Head>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

const Main = styled.main`
  margin: 0 auto;
  padding: 40px 30px;
  width: 100%;
`;

export default MainLayout;
