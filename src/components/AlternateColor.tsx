import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BREAKPOINT_MOBILE, BREAKPOINT_TABLET } from "utils/constants";
import getHoverColorFromHex from "utils/getHoverColorFromHex";
import getTextColorFromHex from "utils/getTextColorFromHex";

const AlternateColor = ({ title, hex, fn, onSelect }: Props) => {
  const [array, setArray] = useState<string[]>([]);

  useEffect(() => {
    setArray(fn(hex));
  }, [hex, fn]);

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Title>{title}</Title>
      <ColorContainer>
        {array
          .sort((a, _) => (a === hex ? -1 : 1))
          .map((color, index) => (
            <Color
              key={index}
              onClick={() => onSelect(color)}
              style={{ backgroundColor: color }}
            >
              <p style={{ color: getTextColorFromHex(color) }}>{color}</p>
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
          ))}
      </ColorContainer>
    </div>
  );
};

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

  & > p {
    text-decoration: none;
    width: 100%;
  }

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

type Title = "analogous" | "triadic" | "squares" | "complementary";

type Props = {
  title: string;
  hex: string;
  fn: (hex: string) => string[];
  onSelect: (value: string) => void;
};

export default AlternateColor;
