import styled from "@emotion/styled";
import useColor from "contexts/color/useColor";
import { IconType } from "react-icons";

import { ImSpinner11 as Spinner } from "react-icons/im";
import { AiOutlinePlus as Plus } from "react-icons/ai";
import { MAX_NUMBER_OF_COLORS } from "contexts/color/ColorProvider";

const Toolbar = () => {
  const { addColor, regenerateColors, randomColors } = useColor();

  const allLocked = randomColors.every((color) => color.locked);
  const allAdded = randomColors.length >= MAX_NUMBER_OF_COLORS;
  const noButtonsVisible = allLocked && allAdded;

  const buttons: ToolbarButton[] = [
    {
      Icon: Spinner,
      onClick: regenerateColors,
      hide: allLocked,
    },
    {
      Icon: Plus,
      onClick: addColor,
      hide: allAdded,
    },
  ];

  return (
    <Container className={noButtonsVisible ? "hide" : ""}>
      {buttons.map(({ Icon, onClick, hide }, index) => (
        <Button key={index} onClick={onClick} className={hide ? "hide" : ""}>
          <Icon size="50%" color="#777777" />
        </Button>
      ))}
    </Container>
  );
};

const Button = styled.button`
  height: 100%;
  width: 100%;
  background-color: #eaeaea;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 128ms ease;
  @media screen and (hover: hover) {
    &:hover {
      background-color: #dfdfdf;
    }
  }
  &.hide {
    height: 0;
    width: 0;
    margin: 0 !important;
  }
`;

const Container = styled.div`
  height: var(--toolbar-height);
  width: 100vw;
  padding: 0.5rem;
  display: flex;
  transition-property: height, padding;
  transition: 128ms ease;

  & > button:not(:nth-child(1)) {
    margin-left: 0.5rem;
  }

  &.hide {
    height: 0;
    padding: 0;
  }
`;

type ToolbarButton = {
  Icon: IconType;
  onClick: () => void;
  hex?: string;
  hide?: boolean;
};

export default Toolbar;
