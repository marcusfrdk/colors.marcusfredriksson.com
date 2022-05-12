import styled from "@emotion/styled";
import { IconType } from "react-icons";
import { PRIMARY_COLOR } from "utils/constants";

const Button = ({ Icon, onClick, hex = PRIMARY_COLOR, hide }: Props) => {
  return (
    <Container
      className={hide ? "hide" : ""}
      onClick={onClick}
      onKeyDown={(e) => (e.key === " " ? e.preventDefault() : null)}
    >
      <Icon size="50%" color={hex} />
    </Container>
  );
};

const Container = styled.button`
  height: 3rem;
  width: 3rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 196ms ease;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (hover: hover) {
    &:hover {
      background-color: #eaeaea;
    }
    &:active {
      transform: scale(0.9);
    }
  }

  &.hide {
    height: 0;
    width: 0;
    margin: 0 !important;
  }
`;

type Props = {
  Icon: IconType;
  onClick: () => void;
  hex?: string;
  hide?: boolean;
};

export default Button;
