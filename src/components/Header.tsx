import styled from "@emotion/styled";
import Link from "next/link";
import { BREAKPOINT_TABLET } from "utils/constants";
import MobileMenu from "./MobileMenu";
import Menu from "./Menu";

const Header = () => {
  return (
    <Container>
      <MobileMenu />
      <Title>
        <Link href="/">
          <Gradient>Colors</Gradient>
        </Link>
      </Title>
      <Menu />
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
  position: absolute;
  left: 1rem;
  padding: 0.5rem 1rem;

  a {
    text-decoration: none;
    color: var(--strong);
  }

  @media screen and (max-width: ${BREAKPOINT_TABLET}) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Container = styled.header`
  height: var(--header-height);
  width: 100vw;
  background-color: var(--neutrals-0);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 2rem;
  transition: padding 128ms ease;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  @media screen and (max-width: ${BREAKPOINT_TABLET}) {
    padding: 0 1rem;
    justify-content: space-between;
  }
`;

export default Header;
