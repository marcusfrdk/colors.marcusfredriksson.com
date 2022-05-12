import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { RandomColor } from "contexts/color/ColorContext";
import { useLayoutEffect, useState } from "react";
import getTextColorFromHex from "utils/getTextColorFromHex";
import useColor from "contexts/color/useColor";
import copyToClipboard from "utils/copyToClipboard";
import Button from "./Button";
import { BREAKPOINT_TABLET } from "utils/constants";

import { BsFillTrashFill } from "react-icons/bs";
import { FaLayerGroup as Layers } from "react-icons/fa";
import { AiFillLock as Lock, AiFillUnlock as Unlock } from "react-icons/ai";

const RandomColor = ({ color, index }: Props) => {
  const { removeColor, randomColors, toggleColorLock } = useColor();

  const [stateTextColor, setStateTextColor] = useState("#ffffff");

  useLayoutEffect(() => {
    setStateTextColor(getTextColorFromHex(color.hex));
  }, [color, setStateTextColor]);

  return (
    <Container
      css={css`
        background-color: ${color.hex};
        color: ${stateTextColor};
      `}
      onClick={() => copyToClipboard(color.hex)}
    >
      <HexColor>{color.hex}</HexColor>
      <ButtonContainer>
        <Button
          Icon={color.locked ? Lock : Unlock}
          onClick={() => toggleColorLock(index)}
          hex={color.hex}
        />
        <Button
          Icon={Layers}
          onClick={() => console.log("Using layers")}
          hex={color.hex}
        />
        <Button
          Icon={BsFillTrashFill}
          hex={color.hex}
          onClick={() => removeColor(index)}
          hide={randomColors.length <= 1 || color.locked}
        />
      </ButtonContainer>
    </Container>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1rem;

  & > button {
    margin-top: 0 !important;
  }

  & > button:not(:first-of-type) {
    margin-left: 1rem;
  }

  @media screen and (max-width: ${BREAKPOINT_TABLET}) {
    margin-top: 0;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 256ms ease;
  cursor: pointer;
  user-select: none;
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media screen and (max-width: ${BREAKPOINT_TABLET}) {
    flex-direction: row;
    justify-content: space-between;
    padding: 0 1rem;
  }
`;

const HexColor = styled.p`
  font-size: 1.25rem;
  font-weight: var(--font-medium);
  transition: font-size 128ms ease;
`;

type Props = {
  color: RandomColor;
  index: number;
};

export default RandomColor;
