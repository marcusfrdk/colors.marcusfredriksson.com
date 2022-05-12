import styled from "@emotion/styled";
import { IconType } from "react-icons";
import Button from "./Button";

const Toolbar = ({ buttons }: ToolbarProps) => {
  const hide = buttons.every((button) => button.hide);

  return (
    <Container className={hide ? "hide" : ""}>
      {buttons.map((props, index) => {
        return <Button key={index} {...props} />;
      })}
    </Container>
  );
};

const Container = styled.menu`
  padding: 0.5rem;
  background-color: #ffffff;
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 1rem;

  &.hide {
    padding: 0;
  }
`;

export type ToolbarButton = {
  Icon: IconType;
  onClick: () => void;
  tooltip: string;
  hide?: boolean;
};

export type ToolbarProps = {
  buttons: ToolbarButton[];
};

export default Toolbar;
