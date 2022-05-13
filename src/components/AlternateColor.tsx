import { css } from "@emotion/react";
import styled from "@emotion/styled";
import useMessage from "contexts/message/useMessage";
import { BREAKPOINT_MOBILE, BREAKPOINT_TABLET } from "utils/constants";
import copyToClipboard from "utils/copyToClipboard";
import getHoverColorFromHex from "utils/getHoverColorFromHex";
import getTextColorFromHex from "utils/getTextColorFromHex";

const AlternateColor = ({ title, hex, array }: Props) => {
  const { newToast } = useMessage();

  return (
    <Container>
      <Title>{title}</Title>
      <ColorContainer>
        {array.map((color, index) => (
          <Color
            key={index}
            css={css`
              background-color: ${color};
              color: ${getTextColorFromHex(color)};
            `}
            onClick={() => {
              const success = copyToClipboard(color);
              newToast(
                success
                  ? `'${color}' copied to clipboard`
                  : "Failed to copy to clipboard"
              );
            }}
          >
            <p>{color}</p>
            {color === hex ? (
              <Label
                css={css`
                  background-color: ${getHoverColorFromHex(color)};
                `}
              >
                Selected
              </Label>
            ) : null}
          </Color>
        ))}
      </ColorContainer>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.p`
  font-weight: var(--font-medium);
  margin-bottom: 0.5rem;
`;

const Label = styled.p`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-left: 0.5rem;
`;

const ColorContainer = styled.div`
  display: flex;
  user-select: none;
  @media screen and (max-width: ${BREAKPOINT_MOBILE}) {
    flex-direction: column;
    & > div {
      margin-bottom: 0.5rem;
    }
  }
`;

const Color = styled.div`
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
  transition: margin-right 256ms ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  &:not(:last-of-type) {
    margin-right: 1rem;
  }
  @media screen and (max-width: ${BREAKPOINT_TABLET}) {
    &:not(:last-of-type) {
      margin-right: 0.5rem;
    }
  }
`;

type Props = {
  title: string;
  hex: string;
  array: string[];
};

export default AlternateColor;
