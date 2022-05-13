import { css } from "@emotion/react";
import styled from "@emotion/styled";
import AlternateColor from "components/AlternateColor";
import SEO from "components/SEO";
import useMessage from "contexts/message/useMessage";
import { GetServerSideProps } from "next";
import { BREAKPOINT_MOBILE, BREAKPOINT_TABLET } from "utils/constants";
import copyToClipboard from "utils/copyToClipboard";
import generateRandomHex from "utils/generateRandomHex";
import generateShades from "utils/generateShades";
import getAnalogousColors from "utils/getAnalogousColors";
import getComplementaryColors from "utils/getComplementaryColors";
import getHoverColorFromHex from "utils/getHoverColorFromHex";
import getSquareColors from "utils/getSquareColors";
import getTextColorFromHex from "utils/getTextColorFromHex";
import getTradicColors from "utils/getTriadicColors";
import isHex from "utils/isHex";
import Shades from "../components/Shades";

const ShadesPage = ({
  hex,
  shades,
  analogous,
  triadic,
  squares,
  complementary,
  hover,
}: Props) => {
  const { newToast } = useMessage();

  return (
    <Container>
      <Content>
        <SEO
          title="Shades | Talmio Colors"
          description="Generate shades, gradients and alternate color schemes."
        />
        <MainColor
          css={css`
            background-color: ${hex};
            color: ${getTextColorFromHex(hex)};
          `}
        >
          <p
            onClick={() => {
              const success = copyToClipboard(hex);
              newToast(
                success ? "Color copied to clipboard" : "Failed to copy color"
              );
            }}
            css={css`
              @media screen and (hover: hover) {
                &:hover {
                  background-color: ${hover};
                }
              }
            `}
          >
            {hex}
          </p>
          <p>
            {getTextColorFromHex(hex) === "#ffffff" ? "Light" : "Dark"} text
            recommended
          </p>
        </MainColor>

        <Shades hex={hex} defaultValue={shades} />

        <AlternateColor title="Analogous Colors" hex={hex} array={analogous} />
        <AlternateColor title="Triadic Colors" hex={hex} array={triadic} />
        <AlternateColor
          title="Complementary Colors"
          hex={hex}
          array={complementary}
        />
        <AlternateColor title="Square Colors" hex={hex} array={squares} />
      </Content>
    </Container>
  );
};

const MainColor = styled.div`
  height: 12rem;
  border-radius: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding: 1rem;
  margin-bottom: 2rem;
  user-select: none;
  & > p:first-of-type {
    font-size: 1.5rem;
    font-weight: var(--font-medium);
    margin-bottom: 0.25rem;
    width: fit-content;
    transition-property: padding, background-color;
    transition: 256ms ease-in-out;
    border-radius: 0.5rem;
    cursor: pointer;
    @media screen and (hover: hover) {
      &:hover {
        padding: 0.5rem 1rem;
      }
    }
  }
`;

const Content = styled.div`
  width: ${BREAKPOINT_TABLET};
  max-width: calc(100vw - 4rem);
  transition: max-width 64ms ease-in-out;
  @media screen and (max-width: ${BREAKPOINT_MOBILE}) {
    max-width: calc(100vw - 2rem);
  }
`;

const Container = styled.main`
  padding-top: calc(var(--header-height) + 1rem);
  display: flex;
  justify-content: center;
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;

  const hex =
    query.color && !Array.isArray(query.color) && isHex(query.color)
      ? decodeURIComponent(query.color)
      : generateRandomHex();

  const shades = generateShades(hex);
  const analogous = getAnalogousColors(hex);
  const triadic = getTradicColors(hex);
  const squares = getSquareColors(hex);
  const complementary = getComplementaryColors(hex);
  const hover = getHoverColorFromHex(hex);

  return {
    props: {
      hex,
      shades,
      analogous,
      triadic,
      squares,
      complementary,
      hover,
    },
  };
};

type Props = {
  hex: string;
  shades: string[];
  analogous: string[];
  triadic: string[];
  squares: string[];
  complementary: string[];
  hover: string;
};

export default ShadesPage;
