import styled from "@emotion/styled";
import Link from "next/link";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { menu } from "types/Menu";
import { HiOutlineMenuAlt1 as Menu } from "react-icons/hi";
import { BREAKPOINT_TABLET } from "utils/constants";

const timeout = 512;

const MobileMenu = () => {
  const [stateIsVisible, setStateIsVisible] = useState(false);

  const props = {
    in: stateIsVisible,
    timeout,
    unmountOnExit: true,
    classNames: "menu",
  };

  return (
    <>
      <ToggleButton onClick={() => setStateIsVisible((s) => !s)}>
        <Menu size="60%" />
      </ToggleButton>
      <CSSTransition {...props}>
        <Backdrop onClick={() => setStateIsVisible(false)} />
      </CSSTransition>
      <CSSTransition {...props}>
        <Container>
          {menu.map(({ label, href, Icon, newTab }, index) => (
            <li key={index} onClick={() => setStateIsVisible(false)}>
              <Link href={href} target={newTab ? "_blank" : "_self"}>
                <Icon size="1.5rem" />
                <p>{label}</p>
              </Link>
            </li>
          ))}
          <KeyboardCloseButton onClick={() => setStateIsVisible(false)}>
            Close menu
          </KeyboardCloseButton>
        </Container>
      </CSSTransition>
    </>
  );
};

const KeyboardCloseButton = styled.button`
  background-color: var(--neutrals-50);
  height: 3rem;
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  opacity: 0;
  pointer-events: none;
  color: var(--weak);
  user-select: none;

  &:focus {
    opacity: 1;
  }
`;

const ToggleButton = styled.button`
  height: calc(var(--header-height) - 0.5rem);
  width: calc(var(--header-height) - 0.5rem);
  border: none;
  border-radius: 0.5rem;
  display: none;
  justify-content: center;
  align-items: center;
  background: none;
  cursor: pointer;
  transition: background-color 64ms ease;
  color: var(--strong);

  @media screen and (max-width: ${BREAKPOINT_TABLET}) {
    display: flex;
  }

  @media screen and (hover: hover) {
    &:hover {
      background-color: var(--neutrals-50);
    }
  }
`;

const Container = styled.ul`
  height: 100vh;
  width: 24rem;
  max-width: 80vw;
  background-color: var(--neutrals-0);
  position: fixed;
  left: 0;
  top: 0;
  transition: left ${timeout}ms ease;
  z-index: 103;
  padding: 1rem;
  list-style: none;

  li {
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0 1rem;
      height: 3rem;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      color: var(--strong);
      transition: background-color 64ms ease;
      margin-bottom: 1rem;

      svg {
        margin-right: 0.75rem;
      }

      @media screen and (hover: hover) {
        &:hover {
          background-color: var(--neutrals-50);
        }
      }
    }
  }

  &.menu-enter {
    left: -24rem;
  }

  &.menu-enter-active {
    left: 0;
  }

  &.menu-exit {
    left: 0;
  }

  &.menu-exit-active {
    left: -24rem;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #000000;
  opacity: 0.25;
  transition: opacity ${timeout}ms ease;
  z-index: 102;

  &.menu-enter {
    opacity: 0;
  }

  &.menu-enter-active {
    opacity: 0.25;
  }

  &.menu-exit {
    opacity: 0.25;
  }

  &.menu-exit-active {
    opacity: 0;
  }
`;

export default MobileMenu;
