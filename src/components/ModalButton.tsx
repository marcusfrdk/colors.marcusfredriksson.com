import styled from "@emotion/styled";
import { css } from "@emotion/react";

const ModalButton = ({
  text,
  onClick,
  textHex = "#999999",
  bgHex = "#eaeaea",
  hoverBgHex = "#dfdfdf",
}: Props) => {
  return (
    <Container
      css={css`
        color: ${textHex};
        background-color: ${bgHex};
        @media screen and (hover: hover) {
          &:hover:not(:disabled) {
            background-color: ${hoverBgHex};
          }
        }
      `}
      onClick={onClick}
    >
      {text}
    </Container>
  );
};

const Container = styled.button`
  width: 100%;
  height: 3rem;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0.5rem;

  &:not(:first-of-type) {
    margin-left: 1rem;
  }
`;

type Props = {
  text: string;
  onClick: () => void;
  textHex?: string;
  bgHex?: string;
  hoverBgHex?: string;
};

export default ModalButton;
