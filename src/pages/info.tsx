import styled from "@emotion/styled";
import AlternateColor from "components/AlternateColor";
import ColorMode from "components/ColorMode";
import SEO from "components/SEO";
import generateRandomHex from "utils/generateRandomHex";
import isHex from "utils/isHex";
import Shades from "../components/Shades";
import getAnalogousColors from "utils/getAnalogousColors";
import getComplementaryColors from "utils/getComplementaryColors";
import getSquareColors from "utils/getSquareColors";
import getTradicColors from "utils/getTriadicColors";
import InfoHistory from "components/InfoHistory";
import InfoColor from "components/InfoColor";
import { GetServerSideProps } from "next";
import { BREAKPOINT_MOBILE, BREAKPOINT_TABLET } from "utils/constants";
import { useCallback, useState } from "react";

const InfoPage = ({ hex, shades, hexIsDefined }: Props) => {
  const [selectedColor, setSelectedColor] = useState<string>(hex);
  const [history, setHistory] = useState<string[]>([]);

  const handleClear = () => {
    localStorage.removeItem("info-history");
    setHistory([]);
  };

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
          description="Show detailed information about a color, such as alternate color schemes, various color types and shades."
        />

        <InfoColor selectedColor={selectedColor} updateColor={updateColor} />

        <ColorModeList>
          <ColorMode mode="hex" hex={selectedColor} />
          <ColorMode mode="rgb" hex={selectedColor} />
          <ColorMode mode="hsl" hex={selectedColor} />
          <ColorMode mode="cmyk" hex={selectedColor} />
        </ColorModeList>

        <InfoHistory
          hex={hex}
          history={history}
          setHistory={setHistory}
          updateColor={updateColor}
          hexIsDefined={hexIsDefined}
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

        <ClearHistory disabled={history.length === 0} onClick={handleClear}>
          Clear history
        </ClearHistory>
      </Content>
    </Container>
  );
};

const ClearHistory = styled.button`
  padding-bottom: 4rem;
  text-align: center;
  user-select: none;
  font-size: 1rem;
  cursor: pointer;
  color: var(--red-500);
  background: none;
  border: none;
  width: 100%;

  &:disabled {
    cursor: default;
    color: var(--muted);
  }
`;

const ColorModeList = styled.ul`
  display: flex;
  list-style: none;
  margin-top: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
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

  let hex: string;
  let hexIsDefined = false;

  if (query.hex && !Array.isArray(query.hex) && isHex(query.hex)) {
    hex = decodeURIComponent(query.hex);
    hexIsDefined = true;
  } else {
    hex = generateRandomHex();
  }

  return {
    props: {
      hex,
      hexIsDefined,
    },
  };
};

type Props = {
  hex: string;
  shades: string[];
  hover: string;
  hexIsDefined: boolean;
};

export default InfoPage;
