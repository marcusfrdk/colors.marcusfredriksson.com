import styled from "@emotion/styled";
import { css } from "@emotion/react";
import useColor from "contexts/color/useColor";

const RegenerateButton = () => {
  const { randomColors, regenerateColors } = useColor();

  const allLocked = randomColors.every((color) => color.locked);
  if (randomColors.length === 0 || allLocked) return null;

  const gradientLeft = randomColors[0].hex;
  const gradientRight = randomColors[randomColors.length - 1].hex;
  const text =
    randomColors.length === 1 ? "Regenerate color" : "Regenerate colors";

  return (
    <Container onClick={regenerateColors} onKeyDown={(e) => e.preventDefault()}>
      <p
        css={css`
          background: -webkit-linear-gradient(
            -45deg,
            ${gradientLeft},
            ${gradientRight}
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        `}
      >
        {text}
      </p>
    </Container>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  font-size: 1.125rem;
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: background-color 128ms ease;
  user-select: none;
  @media screen and (hover: hover) {
    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

export default RegenerateButton;
