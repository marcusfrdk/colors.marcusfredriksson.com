import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import generateShades from "utils/generateShades";
import getGradientString from "utils/getGradientString";
import getHoverColorFromHex from "utils/getHoverColorFromHex";
import getTextColorFromHex from "utils/getTextColorFromHex";

const baseNames = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50, 0];

const Shades = ({ hex, onSelect }: Props) => {
  function getGradient(shades: string[]): string {
    return getGradientString(
      shades[0],
      shades[Math.round(shades.length / 2)],
      shades[shades.length - 1]
    );
  }

  const [shades, setShades] = useState(generateShades(hex));
  const [gradient, setGradient] = useState(getGradient(generateShades(hex)));

  useEffect(() => {
    if (!shades.includes(hex)) {
      const newShades = generateShades(hex);
      setShades(newShades);
      setGradient(getGradient(newShades));
    }
  }, [hex, shades]);

  return (
    <Container>
      <Title>Shades</Title>
      <Content>
        <ShadesContainer>
          {shades.map((shade, index) => (
            <Shade
              onClick={() => onSelect(shade)}
              key={index}
              style={{ backgroundColor: shade }}
            >
              <div>
                <p style={{ color: getTextColorFromHex(shade) }}>{shade}</p>
                {shade === hex && (
                  <Label
                    css={css`
                      background-color: ${getHoverColorFromHex(shade)};
                      color: ${getTextColorFromHex(shade)};
                    `}
                  >
                    Selected
                  </Label>
                )}
              </div>
              {shades.length === baseNames.length ? (
                <p
                  css={css`
                    color: ${getTextColorFromHex(shade)};
                  `}
                >
                  {baseNames[index]}
                </p>
              ) : null}
            </Shade>
          ))}
        </ShadesContainer>
        <Gradient style={{ background: gradient }} />
      </Content>
    </Container>
  );
};

const Shade = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  cursor: pointer;
  & > div {
    display: flex;
    align-items: center;
  }
  & > p {
    opacity: 1;
  }
`;

const Gradient = styled.div`
  width: 6rem;
  position: relative;
  border-radius: 1rem;
  margin-left: 1rem;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  position: relative;
`;

const Label = styled.p`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-left: 0.5rem;
`;

const Title = styled.p`
  font-weight: var(--font-medium);
  margin-bottom: 0.5rem;
`;

const ShadesContainer = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

type Props = {
  hex: string;
  defaultValue?: string[];
  onSelect: (value: string) => void;
};

export default Shades;
