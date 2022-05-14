import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillGithub as Github } from "react-icons/ai";
import { menu } from "types/Menu";
import { BREAKPOINT_TABLET, REPOSITORY_URL } from "utils/constants";

const Menu = () => {
  const router = useRouter();

  return (
    <Container>
      {menu
        .filter((f) => !f.mobileOnly)
        .map(({ label, href }, index) => (
          <li key={index}>
            <Link href={href}>
              <a
                className={router.asPath.split("?")[0] === href ? "active" : ""}
              >
                {label}
              </a>
            </Link>
          </li>
        ))}
      <a
        href={REPOSITORY_URL}
        target="_blank"
        rel="noopener noreferrer"
        css={css`
          text-decoration: none;
          color: var(--strong);
        `}
      >
        <Github size="2rem" color="var(--strong)" />
      </a>
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;

  a {
    text-decoration: none;
    color: var(--weak);

    &.active {
      color: var(--strong);
    }
  }

  & > *:not(a) {
    margin-right: 2rem;
  }

  @media screen and (max-width: ${BREAKPOINT_TABLET}) {
    display: none;
  }
`;

export default Menu;
