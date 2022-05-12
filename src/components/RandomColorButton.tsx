import styled from "@emotion/styled";
import { IconType } from "react-icons";

const RandomColorButton = ({ Icon, onClick, hex, show = true }: Props) => {
  if (!show) return null;

  return (
    <Container onClick={onClick}>
      <Icon color={hex} size="40%" />
    </Container>
  );
};

const Container = styled.button`
  height: 3rem;
  width: 3rem;
  background-color: #ffffff;
  border: none;
  border-radius: 0.5rem;
`;

type Props = {
  Icon: IconType;
  onClick: () => void;
  hex: string;
  show?: boolean;
};

export default RandomColorButton;
