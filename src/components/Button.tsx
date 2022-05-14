import { css } from "@emotion/react";
import styled from "@emotion/styled";
import useColor from "contexts/color/useColor";
import { IconType } from "react-icons";
import { BREAKPOINT_TABLET } from "utils/constants";

const Button = ({ Icon, onClick, disabled }: Props) => {
  const { colors } = useColor();

  return (
    <Container
      className="button"
      disabled={disabled}
      onClick={onClick}
      onKeyDown={(e) => (e.key === " " ? e.preventDefault() : null)}
      css={
        colors.length > 8 &&
        css`
          @media screen and (max-width: ${BREAKPOINT_TABLET}) {
            height: 2rem;
            width: 2rem;
          }
        `
      }
    >
      <Icon size="50%" color="var(--strong)" />
    </Container>
  );
};

const Container = styled.button`
  height: 3rem;
  width: 3rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 256ms ease;
  background-color: var(--neutrals-0);
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (hover: hover) {
    &:hover {
      background-color: var(--neutrals-50);
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
  disabled?: boolean;
};

export default Button;
