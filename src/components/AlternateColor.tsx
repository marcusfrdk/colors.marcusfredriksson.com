import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { BREAKPOINT_MOBILE, BREAKPOINT_TABLET } from "utils/constants";
import getHoverColorFromHex from "utils/getHoverColorFromHex";
import getTextColorFromHex from "utils/getTextColorFromHex";
import { getInfoPageUrl } from "utils/urls";

const AlternateColor = ({ title, hex, array }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <ColorContainer>
        {array.map((color, index) => (
          <Link key={index} href={getInfoPageUrl(color)} scroll={false}>
            <Color
              css={css`
                background-color: ${color};
              `}
            >
              <p
                css={css`
                  color: ${getTextColorFromHex(color)};
                `}
              >
                {color}
              </p>
              {color === hex ? (
                <Label
                  css={css`
                    background-color: ${getHoverColorFromHex(color)};
                    color: ${getTextColorFromHex(color)};
                  `}
                >
                  Selected
                </Label>
              ) : null}
            </Color>
          </Link>
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
  cursor: pointer;
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
