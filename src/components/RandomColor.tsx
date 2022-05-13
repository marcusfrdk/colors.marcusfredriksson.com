import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Color } from "contexts/color/ColorContext";
import { useLayoutEffect, useState } from "react";
import getTextColorFromHex from "utils/getTextColorFromHex";
import useColor from "contexts/color/useColor";
import copyToClipboard from "utils/copyToClipboard";
import Button from "./Button";
import { BREAKPOINT_TABLET } from "utils/constants";
import getHoverColorFromHex from "utils/getHoverColorFromHex";
import useMessage from "contexts/message/useMessage";

import { BsFillTrashFill } from "react-icons/bs";
import { IoIosCopy as Copy } from "react-icons/io";
import { AiFillLock as Lock, AiFillUnlock as Unlock } from "react-icons/ai";
import { useRouter } from "next/router";

const RandomColor = ({ color, index }: Props) => {
  const { removeColor, colors, toggleColorLock } = useColor();
  const { newToast } = useMessage();
  const router = useRouter();

  const [stateTextColor, setStateTextColor] = useState("#ffffff");

  useLayoutEffect(() => {
    setStateTextColor(getTextColorFromHex(color.hex));
  }, [color, setStateTextColor]);

  return (
    <Container>
      <HexColor
        onClick={() => {
          const success = copyToClipboard(color.hex);
          success
            ? newToast(`'${color.hex}' copied to clipboard`)
            : newToast("Failed to copy value to clipboard");
        }}
        css={css`
          color: ${stateTextColor};
          @media screen and (hover: hover) {
            &:hover {
              background-color: ${getHoverColorFromHex(color.hex)};
            }
          }
          @media screen and (max-width: ${BREAKPOINT_TABLET}) {
            margin: 0;
          }
        `}
      >
        <p>{color.hex}</p>
        <Copy size="1rem" />
      </HexColor>
      <ButtonContainer>
        <Button
          Icon={color.locked ? Lock : Unlock}
          onClick={() => toggleColorLock(index)}
          hex={color.hex}
        />
        <Button
          Icon={BsFillTrashFill}
          hex={color.hex}
          onClick={() => removeColor(index)}
          disabled={colors.length <= 1 || color.locked}
        />
      </ButtonContainer>
      <Background
        css={css`
          background-color: ${color.hex};
        `}
        onClick={() =>
          router.push(`/shades?color=${encodeURIComponent(color.hex)}`)
        }
      />
    </Container>
  );
};

const Background = styled.div`
  background-color: red;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  position: relative;
  z-index: 2;

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
  position: relative;

  @media screen and (max-width: ${BREAKPOINT_TABLET}) {
    flex-direction: row;
    justify-content: space-between;
    padding: 0 1rem;
  }
`;

const HexColor = styled.div`
  transition: font-size 128ms ease;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;

  & > p {
    font-size: 1.25rem;
    font-weight: var(--font-medium);
    margin-right: 0.5rem;
  }
`;

type Props = {
  color: Color;
  index: number;
};

export default RandomColor;
