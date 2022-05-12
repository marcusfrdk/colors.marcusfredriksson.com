import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { AiFillGithub as Github } from "react-icons/ai";
import { BREAKPOINT_TABLET, REPOSITORY_URL } from "utils/constants";

const Header = () => {
  return (
    <Container>
      <Title>
        Talmio <Gradient>Colors</Gradient>
      </Title>
      <a
        href={REPOSITORY_URL}
        target="_blank"
        rel="noopener noreferrer"
        css={css`
          text-decoration: none;
          color: #1c1c1c;
        `}
      >
        <Github size="2rem" />
      </a>
    </Container>
  );
};

const Gradient = styled.span`
  background: -webkit-linear-gradient(
    -45deg,
    #7311e4,
    #166eda,
    #44cd2e,
    #ffb405,
    #f31103
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Title = styled.p`
  font-weight: var(--font-medium);
`;

const Container = styled.header`
  height: var(--header-height);
  width: 100vw;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  transition: padding 128ms ease;

  @media screen and (max-width: ${BREAKPOINT_TABLET}) {
    padding: 0 1rem;
  }
`;

export default Header;
