import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
import { CSSTransition } from "react-transition-group";

const timeout = 512;

const Modal = ({ children, isVisible, setIsVisible }: Props) => {
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
        <Container>{children}</Container>
      </CSSTransition>
    </>
  );
};

const Container = styled.div`
  padding: 2rem;
  background-color: #fff;
  border-radius: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  transition-property: opacity, top;
  -webkit-transition-property: opacity, top;
  transition: ${timeout}ms ease;
  opacity: 1;

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
  background-color: black;
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
};

export default Modal;
