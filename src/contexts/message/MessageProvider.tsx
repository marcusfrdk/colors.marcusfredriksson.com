import styled from "@emotion/styled";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import generateRandomHex from "utils/generateRandomHex";
import MessageContext, { Toast } from "./MessageContext";

const toastTimeout = 3000;
const toastAnimationDuration = 256;
const toastTimeoutDelay = 100;

const MessageProvider = ({ children }: Props) => {
  const [stateToastQueue, setStateToastQueue] = useState<Record<string, Toast>>(
    {}
  );

  const newToast = (message: string) => {
    const id = generateRandomHex();
    const toast = { message, isVisible: false };

    setStateToastQueue((queue) => ({ ...queue, [id]: toast }));

    // 1. Set toast to visible
    // 2. After set duration, set toast to hidden
    // 3. After animation, remove toast from queue
    setTimeout(() => {
      setStateToastQueue((queue) => ({
        ...queue,
        [id]: { ...toast, isVisible: true },
      }));
      setTimeout(() => {
        setStateToastQueue((queue) => ({
          ...queue,
          [id]: { ...toast, isVisible: false },
        }));
        setTimeout(() => {
          setStateToastQueue((queue) => {
            const newQueue = { ...queue };
            delete newQueue[id];
            return newQueue;
          });
        }, toastAnimationDuration);
      }, toastTimeout + toastTimeoutDelay);
    }, toastTimeoutDelay);
  };

  return (
    <MessageContext.Provider value={{ newToast }}>
      {Object.values(stateToastQueue).map(({ message, isVisible }, index) => (
        <CSSTransition
          in={isVisible}
          key={index}
          timeout={toastAnimationDuration}
          unmountOnExit
          classNames="toast"
        >
          <Toast>{message}</Toast>
        </CSSTransition>
      ))}
      {children}
    </MessageContext.Provider>
  );
};

const Toast = styled.p`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--neutrals-0);
  border: 1px solid var(--neutrals-100);
  user-select: none;
  border-radius: 999px;
  z-index: 1000;
  padding: 0.5rem 1.5rem;
  transition-property: opacity, top;
  transition: ${toastAnimationDuration}ms ease-in-out;
  top: 2rem;
  opacity: 1;
  color: var(--strong);

  &.toast-enter {
    top: 0;
    opacity: 0;
  }

  &.toast-enter-active {
    top: 2rem;
    opacity: 1;
  }

  &.toast-exit {
    top: 2rem;
    opacity: 1;
  }

  &.toast-exit-active {
    top: 0;
    opacity: 0;
  }
`;

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default MessageProvider;
