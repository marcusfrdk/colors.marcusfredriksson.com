import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
import { CSSTransition } from "react-transition-group";

const timeout = 512;

const Modal = ({ children, isVisible, setIsVisible, title }: Props) => {
  const props = {
    in: isVisible,
    timeout,
    classNames: "modal",
  };

  return (
    <>
      <CSSTransition {...props} unmountOnExit>
        <Backdrop onClick={() => setIsVisible(false)} />
      </CSSTransition>
      <CSSTransition {...props} unmountOnExit>
        <Container>
          {title && <Title>{title}</Title>}
          {children}
        </Container>
      </CSSTransition>
    </>
  );
};

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: var(--font-medium);
  margin-bottom: 0.5rem;
`;

const Container = styled.div`
  padding: 1.5rem;
  background-color: var(--neutrals-0);
  border-radius: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  transition-property: opacity, top, width;
  transition: ${timeout}ms ease;
  opacity: 1;
  max-width: calc(100vw - 2rem);
  width: 48rem;

  &.modal-enter {
    opacity: 0;
    top: 55%;
  }
  &.modal-enter-active {
    opacity: 1;
    top: 50%;
  }
  &.modal-exit {
    opacity: 1;
    top: 50%;
  }
  &.modal-exit-active {
    opacity: 0;
    top: 55%;
  }
`;

const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #000000;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  opacity: 0.25;

  -webkit-transition: opacity ${timeout}ms ease;
  transition: opacity ${timeout}ms ease;

  &.modal-enter {
    opacity: 0;
  }
  &.modal-enter-active {
    opacity: 0.25;
  }
  &.modal-exit {
    opacity: 0.25;
  }
  &.modal-exit-active {
    opacity: 0;
  }
`;

type Props = {
  children: JSX.Element | JSX.Element[];
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  title?: string;
};

export default Modal;
