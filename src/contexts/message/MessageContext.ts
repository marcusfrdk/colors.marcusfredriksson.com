import { createContext } from "react";

export type NewToast = (message: string) => void;

export interface IMessageContext {
  newToast: NewToast;
}

export type Toast = {
  message: string;
  isVisible: boolean;
};

const MessageContext = createContext<IMessageContext>({
  newToast: () => undefined,
});

export default MessageContext;
