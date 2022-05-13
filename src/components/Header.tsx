import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { MenuItem } from "types/Menu";
import { BREAKPOINT_TABLET, REPOSITORY_URL } from "utils/constants";
import MobileMenu from "./MobileMenu";

import { AiFillGithub as Github } from "react-icons/ai";
import { IoMdColorFill as Colors } from "react-icons/io";
import { FaLayerGroup as Shades } from "react-icons/fa";

const Header = () => {
  const menu: MenuItem[] = [
    { label: "Colors", href: "/", Icon: Colors },
    { label: "Shades", href: "/shades", Icon: Shades },
    {
      label: "Source code",
      href: REPOSITORY_URL,
      Icon: Github,
      newTab: true,
    },
  ];

  return (
    <Container>
      <MobileMenu menu={menu} />
      <Title>
        Talmio <Gradient>Colors</Gradient>
      </Title>
      <DesktopMenu>
        {menu.map(({ label, href }, index) => (
          <li key={index}>
            <Link href={href}>
              <a>{label}</a>
            </Link>
          </li>
        ))}
        <a
          href={REPOSITORY_URL}
          target="_blank"
          rel="noopener noreferrer"
          css={css`
            text-decoration: none;
            color: #1c1c1c;
          `}
        >
          <Github size="2rem" color="#1c1c1c" />
        </a>
      </DesktopMenu>
    </Container>
  );
};

const DesktopMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;

  a {
    text-decoration: none;
    color: #1c1c1c;
  }

  & > *:not(a) {
    margin-right: 2rem;
  }

  @media screen and (max-width: ${BREAKPOINT_TABLET}) {
    display: none;
  }
`;

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
  left: 2rem;

  @media screen and (max-width: ${BREAKPOINT_TABLET}) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Container = styled.header`
  height: var(--header-height);
  width: 100vw;
  background-color: #ffffff;
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
