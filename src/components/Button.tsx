import { css } from "@emotion/react";
import styled from "@emotion/styled";
import useColor from "contexts/color/useColor";
import { IconType } from "react-icons";
import { BREAKPOINT_TABLET, PRIMARY_COLOR } from "utils/constants";

const Button = ({ Icon, onClick, hex = PRIMARY_COLOR, disabled }: Props) => {
  const { randomColors } = useColor();

  return (
    <Container
      disabled={disabled}
      onClick={onClick}
      onKeyDown={(e) => (e.key === " " ? e.preventDefault() : null)}
      css={
        randomColors.length > 8 &&
        css`
          @media screen and (max-width: ${BREAKPOINT_TABLET}) {
            height: 2rem;
            width: 2rem;
          }
        `
      }
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

  &:disabled {
    height: 0;
    width: 0;
    margin: 0 !important;
  }

  & > svg {
    transition: fill 128ms ease;
  }
`;

type Props = {
  Icon: IconType;
  onClick: () => void;
  hex?: string;
  disabled?: boolean;
};

export default Button;
