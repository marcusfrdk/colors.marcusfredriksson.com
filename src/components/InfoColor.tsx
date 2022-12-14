import styled from "@emotion/styled";
import { useMemo } from "react";
import { FaPen as Pen } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useColor from "contexts/color/useColor";
import getTextColorFromHex from "utils/getTextColorFromHex";
import { css } from "@emotion/react";
import getHoverColorFromHex from "utils/getHoverColorFromHex";

type Props = {
  selectedColor: string;
  updateColor: (value: string) => void;
};

const InfoColor = ({ selectedColor, updateColor }: Props) => {
  const { savedColors, saveColor, unsaveColor } = useColor();
  const hoverColor = useMemo(
    () => getHoverColorFromHex(selectedColor),
    [selectedColor]
  );

  const Heart = useMemo(
    () => (savedColors.includes(selectedColor) ? AiFillHeart : AiOutlineHeart),
    [savedColors, selectedColor]
  );

  const toggleSave = useMemo(
    () => (savedColors.includes(selectedColor) ? unsaveColor : saveColor),
    [savedColors, selectedColor, saveColor, unsaveColor]
  );

  const textColor = useMemo(
    () => getTextColorFromHex(selectedColor),
    [selectedColor]
  );

  return (
    <Container style={{ backgroundColor: selectedColor }}>
      <Block>
        <input type="color" onChange={(e) => updateColor(e.target.value)} />
        <p style={{ color: textColor }}>
          {selectedColor.toUpperCase()}
          <Pen fill={textColor} />
        </p>
        <p style={{ color: textColor }}>
          {textColor === "#ffffff" ? "Light" : "Dark"} text recommended
        </p>
      </Block>
      <Save
        onClick={() => toggleSave(selectedColor)}
        css={css`
          @media screen and (hover: hover) {
            &:hover {
              background-color: ${hoverColor};
            }
          }
        `}
      >
        <Heart fill={textColor} />
      </Save>
    </Container>
  );
};

const Save = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  height: 3rem;
  width: 3rem;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg {
    height: 50%;
    width: 50%;
  }
`;

const Block = styled.div`
  height: 12rem;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  flex-direction: column;
  & > p:first-of-type {
    font-size: 1.5rem;
    font-weight: var(--font-medium);
    margin-bottom: 0.25rem;
    & > svg {
      height: 1rem;
      width: 1rem;
      margin-left: 0.5rem;
    }
  }
  & > input {
    cursor: pointer;
    height: 100%;
    width: 100%;
    background: none;
    outline: none;
    border-radius: 0;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
`;

const Container = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  user-select: none;
`;

export default InfoColor;
