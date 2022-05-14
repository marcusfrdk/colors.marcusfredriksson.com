import styled from "@emotion/styled";
import useMessage from "contexts/message/useMessage";
import { CSSTransition } from "react-transition-group";
import copyToClipboard from "utils/copyToClipboard";
import { BREAKPOINT_MOBILE } from "../utils/constants";

const timeout = 512;

const ExtractedColors = ({ colors, numberOfColors, imageIsLoaded }: Props) => {
  const { newToast } = useMessage();

  const handleClick = (color: string) => {
    const success = copyToClipboard(color);
    newToast(
      success ? `'${color}' copied to clipboard` : "Failed to copy to clipboard"
    );
  };

  return (
    <Container>
      {colors.map((color, index) => {
        if (index >= numberOfColors) return null;
        return (
          <CSSTransition
            in={imageIsLoaded}
            timeout={timeout}
            classNames="color"
            unmountOnExit
            key={index}
          >
            <Color
              style={{ backgroundColor: color }}
              onClick={() => handleClick(color)}
            ></Color>
          </CSSTransition>
        );
      })}
    </Container>
  );
};

const Color = styled.div`
  --color-height: 4rem;
  --color-width: 4rem;

  height: var(--color-height);
  width: var(--color-width);
  transition: ${timeout}ms ease;
  border-radius: 0.5rem;
  margin: 0.5rem;
  transition-property: height, width, background-color;
  cursor: pointer;

  &.color-enter {
    height: 0;
    width: 0;
  }

  &.color-enter-active {
    height: var(--color-height);
    width: var(--color-width);
  }

  &.color-exit {
    height: var(--color-height);
    width: var(--color-width);
  }
  &.color-exit-active {
    height: 0;
    width: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 4rem;
  justify-content: center;
  max-width: calc(100vw - 2rem);
  position: relative;
  z-index: 3;
  @media screen and (max-width: ${BREAKPOINT_MOBILE}) {
    margin-top: 2rem;
  }
`;

type Props = {
  colors: string[];
  numberOfColors: number;
  imageIsLoaded: boolean;
};

export default ExtractedColors;
