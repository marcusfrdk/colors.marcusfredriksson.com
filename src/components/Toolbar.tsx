import styled from "@emotion/styled";
import { IconType } from "react-icons";

const Toolbar = ({ buttons }: ToolbarProps) => {
  return (
    <Container>
      {buttons
        .filter((f) => f.show)
        .map(({ Icon, onClick }, index) => {
          return (
            <Button key={index} onClick={onClick}>
              <Icon size="50%" />
            </Button>
          );
        })}
    </Container>
  );
};

const Button = styled.button`
  height: 3rem;
  width: 3rem;
  background-color: orange;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 196ms ease;
  @media screen and (hover: hover) {
    &:hover {
      transform: scale(0.9);
    }
  }
`;

const Container = styled.menu`
  padding: 0.5rem;
  background-color: red;
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 1rem;
`;

export type ToolbarButton = {
  Icon: IconType;
  onClick: () => void;
  tooltip: string;
  show?: boolean;
};

export type ToolbarProps = {
  buttons: ToolbarButton[];
};

export default Toolbar;
