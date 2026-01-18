import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "@/components";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </Wrapper>
  );
};

export { Layout };

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
