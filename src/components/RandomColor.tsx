import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { RandomColor } from "contexts/color/ColorContext";
import { useLayoutEffect, useState } from "react";
import getTextColorFromHex from "utils/getTextColorFromHex";
import RandomColorButton from "./RandomColorButton";
import { BsFillTrashFill } from "react-icons/bs";
import useColor from "contexts/color/useColor";
import getHoverColorFromHex from "utils/getHoverColorFromHex";
import copyToClipboard from "utils/copyToClipboard";
const RandomColor = ({ color, index }: Props) => {
  const { removeColor, randomColors } = useColor();

  const [stateTextColor, setStateTextColor] = useState("#ffffff");
  const [stateHoverColor, setStateHoverColor] = useState("hsl(0, 0%, 100%)");

  useLayoutEffect(() => {
    setStateHoverColor(getHoverColorFromHex(color.hex));
    setStateTextColor(getTextColorFromHex(color.hex));
  }, [color, setStateTextColor]);

  return (
    <Container
      css={css`
        background-color: ${color.hex};
        color: ${stateTextColor};
        @media screen and (hover: hover) {
          &:hover {
            background-color: ${stateHoverColor};
          }
        }
      `}
      onClick={() => copyToClipboard(color.hex)}
    >
      <HexColor>{color.hex}</HexColor>
      <RandomColorButton
        Icon={BsFillTrashFill}
        hex={color.hex}
        onClick={() => removeColor(index)}
        show={randomColors.length > 1}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 256ms ease;
  cursor: pointer;
  user-select: none;
`;

const HexColor = styled.p`
  font-size: 2rem;
  font-weight: var(--font-medium);
`;

type Props = {
  color: RandomColor;
  index: number;
};

export default RandomColor;
