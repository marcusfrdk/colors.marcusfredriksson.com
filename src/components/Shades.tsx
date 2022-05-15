import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useEffect, useState } from "react";
import generateShades from "utils/generateShades";
import getGradientString from "utils/getGradientString";
import getHoverColorFromHex from "utils/getHoverColorFromHex";
import getTextColorFromHex from "utils/getTextColorFromHex";

const baseNames = [
  0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
].reverse();

const Shades = ({ hex, defaultValue }: Props) => {
  const [stateGradient, setStateGradient] = useState("");
  const [stateShades, setStateShades] = useState(
    defaultValue ?? generateShades(hex)
  );

  useEffect(() => {
    const shades = generateShades(hex);
    setStateShades(shades);
    setStateGradient(
      getGradientString(
        shades[0],
        shades[Math.round(shades.length / 2)],
        shades[shades.length - 1]
      )
    );
  }, [hex]);

  return (
    <Container>
      <Title>Shades</Title>
      <Content>
        <ShadesContainer>
          {stateShades.map((shade, index) => (
            <Link
              key={index}
              href={`/shades?color=${encodeURIComponent(shade)}`}
              scroll={false}
            >
              <Shade
                css={css`
                  background-color: ${shade};
                `}
              >
                <div>
                  <p
                    css={css`
                      color: ${getTextColorFromHex(shade)};
                    `}
                  >
                    {shade}
                  </p>
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
                {stateShades.length === baseNames.length ? (
                  <p
                    css={css`
                      color: ${getTextColorFromHex(shade)};
                    `}
                  >
                    {baseNames[index]}
                  </p>
                ) : null}
              </Shade>
            </Link>
          ))}
        </ShadesContainer>
        <Gradient
          css={css`
            background: ${stateGradient};
          `}
        />
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
};

export default Shades;
