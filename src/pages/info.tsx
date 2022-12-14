import { css } from "@emotion/react";
import styled from "@emotion/styled";
import AlternateColor from "components/AlternateColor";
import ColorMode from "components/ColorMode";
import SEO from "components/SEO";
import { GetServerSideProps } from "next";
import { BREAKPOINT_MOBILE, BREAKPOINT_TABLET } from "utils/constants";
import generateRandomHex from "utils/generateRandomHex";
import getTextColorFromHex from "utils/getTextColorFromHex";
import isHex from "utils/isHex";
import Shades from "../components/Shades";
import {
  AiFillHeart as Heart,
  AiOutlineHeart as BrokenHeart,
} from "react-icons/ai";
import useColor from "contexts/color/useColor";
import { useCallback, useMemo, useRef, useState } from "react";
import { FaPen as Pen } from "react-icons/fa";
import getAnalogousColors from "utils/getAnalogousColors";
import getComplementaryColors from "utils/getComplementaryColors";
import getSquareColors from "utils/getSquareColors";
import getTradicColors from "utils/getTriadicColors";
import InfoHistory from "components/InfoHistory";

const InfoPage = ({ hex, shades, hover }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { savedColors, saveColor, unsaveColor } = useColor();
  const [selectedColor, setSelectedColor] = useState<string>(hex);
  const [history, setHistory] = useState<string[]>([]);
  const textColor = useMemo(
    () => getTextColorFromHex(selectedColor),
    [selectedColor]
  );

  const Icon = useMemo(
    () => (savedColors.includes(selectedColor) ? Heart : BrokenHeart),
    [savedColors, selectedColor]
  );

  const fn = useMemo(
    () => (savedColors.includes(selectedColor) ? unsaveColor : saveColor),
    [savedColors, selectedColor, saveColor, unsaveColor]
  );

  const updateColor = useCallback(
    (value: string, ignoreHistory?: boolean) => {
      if (!isHex(value)) return;
      setSelectedColor(value);
      if (!ignoreHistory) {
        const h = (history[0] === value ? history : [value, ...history]).slice(
          0,
          25
        );
        setHistory(h);
        localStorage.setItem("info-history", JSON.stringify(h));
      }
    },
    [history]
  );

  return (
    <Container>
      <Content>
        <SEO
          title="Information | Colors"
          description="Generate shades, gradients and alternate color schemes."
        />
        <MainColor
          css={css`
            background-color: ${selectedColor};
            * {
              color: ${getTextColorFromHex(selectedColor)};
            }
          `}
        >
          <p
            onClick={() => inputRef.current?.click()}
            css={css`
              @media screen and (hover: hover) {
                &:hover {
                  background-color: ${hover};
                }
              }
            `}
          >
            {selectedColor} <Pen />
          </p>
          <p style={{ color: textColor }}>
            {textColor === "#ffffff" ? "Light" : "Dark"} text recommended
          </p>
          <SaveButton onClick={() => fn(selectedColor)}>
            <Icon color={getTextColorFromHex(selectedColor)} size="1.5rem" />
          </SaveButton>
        </MainColor>
        <ColorModeList>
          <ColorMode mode="hex" hex={selectedColor} />
          <ColorMode mode="rgb" hex={selectedColor} />
          <ColorMode mode="hsl" hex={selectedColor} />
          <ColorMode mode="cmyk" hex={selectedColor} />
        </ColorModeList>

        <InfoHistory
          history={history}
          setHistory={setHistory}
          updateColor={updateColor}
        />

        <Shades
          hex={selectedColor}
          defaultValue={shades}
          onSelect={updateColor}
        />

        <AlternateColor
          title="Analogous Colors"
          hex={selectedColor}
          fn={getAnalogousColors}
          onSelect={updateColor}
        />
        <AlternateColor
          title="Triadic Colors"
          hex={selectedColor}
          fn={getTradicColors}
          onSelect={updateColor}
        />
        <AlternateColor
          title="Complementary Colors"
          hex={selectedColor}
          fn={getComplementaryColors}
          onSelect={updateColor}
        />
        <AlternateColor
          title="Square Colors"
          hex={selectedColor}
          fn={getSquareColors}
          onSelect={updateColor}
        />
      </Content>
      <input
        ref={inputRef}
        type="color"
        onChange={(e) => updateColor(e.target.value)}
        style={{ display: "none" }}
      />
    </Container>
  );
};

const ColorModeList = styled.ul`
  display: flex;
  list-style: none;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const SaveButton = styled.button`
  width: fit-content;
  border: none;
  height: 3rem;
  width: 3rem;
  border-radius: 0.5rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 64ms ease-in-out;

  & > svg {
    transition: 64ms ease-in-out;
    transition-property: fill, color;
  }

  @media screen and (hover: hover) {
    &:hover {
      background-color: var(--neutrals-0);
      * {
        fill: var(--strong);
      }
    }
  }
`;

const MainColor = styled.div`
  position: relative;
  height: 12rem;
  border-radius: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding: 1rem 0.5rem;
  margin-bottom: 1rem;
  user-select: none;
  & > p:first-of-type {
    padding: 0.25rem 0.5rem;
    font-size: 1.5rem;
    font-weight: var(--font-medium);
    margin-bottom: 0.25rem;
    width: fit-content;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    & > svg {
      margin-left: 0.5rem;
      height: 1rem;
      width: 1rem;
    }
  }
  & > p:last-of-type {
    padding: 0 0.5rem;
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
    query.hex && !Array.isArray(query.hex) && isHex(query.hex)
      ? decodeURIComponent(query.hex)
      : generateRandomHex();

  // const shades = parseShadesQuery(query.shades) || generateShades(hex);
  // const hover = getHoverColorFromHex(hex);

  return {
    props: {
      hex,
    },
  };
};

type Props = {
  hex: string;
  shades: string[];
  hover: string;
};

export default InfoPage;
