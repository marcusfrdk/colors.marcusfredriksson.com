import styled from "@emotion/styled";
import SEO from "components/SEO";

const NotFoundPage = () => {
  return (
    <Page>
      <SEO
        title="Not found | Talmio Colors"
        description="The page you were looking for does not seem to exist."
      />
      <Content>
        <Title>Page not found</Title>
        <Description>
          The page you were looking for does not seem to exist. This is usually
          caused by invalid- or broken urls.
        </Description>
      </Content>
    </Page>
  );
};

const Title = styled.h1`
  font-size: 1.25rem;
  color: var(--strong);
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: var(--weak);
  max-width: 32rem;
`;

const Content = styled.div``;

const Page = styled.div`
  padding-top: var(--header-height);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default NotFoundPage;
