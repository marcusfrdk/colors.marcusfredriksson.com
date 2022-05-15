import styled from "@emotion/styled";
import SEO from "components/SEO";
import Link from "next/link";
import Lottie from "react-lottie-player";

import animation from "../animations/not-found.json";

const NotFoundPage = () => {
  return (
    <Page>
      <SEO
        title="Not found | Talmio Colors"
        description="The page you were looking for does not seem to exist."
      />
      <Lottie
        loop
        animationData={animation}
        play
        style={{ height: "12rem", width: "12rem" }}
      />
      <Content>
        <Title>Where did the page go?</Title>
        <Description>
          The page you were looking for does not seem to exist. This is usually
          caused by an invalid- or broken url. Please check the url and try
          again.
        </Description>
        <Link href="/">
          <a style={{ textDecoration: "none" }}>
            <Button>Go back</Button>
          </a>
        </Link>
      </Content>
    </Page>
  );
};

const Button = styled.div`
  background-color: var(--primary-400);
  height: 3rem;
  display: flex;
  align-items: center;
  margin-top: 1rem;
  padding: 0 1.5rem;
  color: #ffffff;
  cursor: pointer;
  width: fit-content;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: var(--font-medium);
  transition: background-color 128ms ease;
  @media screen and (hover: hover) {
    &:hover {
      background-color: var(--primary-500);
    }
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: var(--strong);
  margin-bottom: 0.5rem;
  text-align: center;
  margin-top: 1rem;
`;

const Description = styled.p`
  color: var(--weak);
  width: 32rem;
  max-width: calc(100vw - 4rem);
  line-height: 1.4rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Page = styled.div`
  padding-top: var(--header-height);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default NotFoundPage;
