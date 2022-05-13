import styled from "@emotion/styled";
import useColor from "contexts/color/useColor";
import { IconType } from "react-icons";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import ModalText from "./ModalText";
import ModalButton from "./ModalButton";
import useDevice from "hooks/useDevice";
import { css } from "@emotion/react";

import { ImSpinner11 as Spinner } from "react-icons/im";
import { AiOutlinePlus as Plus } from "react-icons/ai";
import { BsFillTrashFill as Trash } from "react-icons/bs";
import { IoMdRedo as Redo, IoMdUndo as Undo } from "react-icons/io";
import { MAX_NUMBER_OF_COLORS } from "utils/constants";

const Toolbar = () => {
  const {
    addColor,
    regenerateColors,
    colors,
    resetColors,
    redoHistory,
    undoHistory,
    canRedo,
    canUndo,
    canReset,
  } = useColor();
  const { hasChin } = useDevice();

  const [stateAllLocked, setStateAllLocked] = useState(false);
  const [stateAllAdded, setStateAllAdded] = useState(false);
  const [stateModalIsVisible, setStateModalIsVisible] = useState(false);

  useEffect(() => {
    setStateAllLocked(colors.every((c) => c.locked));
    setStateAllAdded(colors.length === MAX_NUMBER_OF_COLORS);
  }, [colors]);

  const buttons: ToolbarButton[] = [
    {
      Icon: Trash,
      onClick: () => setStateModalIsVisible(true),
      disabled: !canReset,
    },
    {
      Icon: Spinner,
      onClick: regenerateColors,
      disabled: stateAllLocked,
    },
    {
      Icon: Plus,
      onClick: addColor,
      disabled: stateAllAdded,
      buttonSize: "2rem",
    },
    {
      Icon: Undo,
      onClick: undoHistory,
      disabled: !canUndo,
    },
    {
      Icon: Redo,
      onClick: redoHistory,
      disabled: !canRedo,
    },
  ];

  return (
    <Container>
      {buttons.map(
        (
          { Icon, onClick, disabled, hex = "#777777", buttonSize = "1.5rem" },
          index
        ) => (
          <Button
            key={index}
            onMouseDown={onClick}
            onKeyDown={(e) => {
              if (e.key === "Enter") onClick();
            }}
            disabled={disabled}
            css={css`
              height: ${hasChin
                ? "calc(var(--toolbar-height) - 3rem)"
                : "calc(var(--toolbar-height) - 1rem)"};
            `}
          >
            <Icon size={buttonSize} color={hex} />
          </Button>
        )
      )}
      <Modal
        isVisible={stateModalIsVisible}
        setIsVisible={setStateModalIsVisible}
        title="Reset colors"
      >
        <ModalText>
          Are you sure you want to reset everything back to default? This will
          remove all colors, including those that are locked as well as your
          entire history.
        </ModalText>
        <ButtonGroup>
          <ModalButton
            text="Reset"
            textHex="#ffffff"
            bgHex="#F31103"
            hoverBgHex="#CA0F02"
            onClick={() => {
              resetColors();
              setStateModalIsVisible(false);
            }}
          />
          <ModalButton
            text="Cancel"
            onClick={() => setStateModalIsVisible(false)}
          />
        </ButtonGroup>
      </Modal>
    </Container>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const Button = styled.button`
  width: 100%;
  background-color: #eaeaea;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 128ms ease;
  @media screen and (hover: hover) {
    &:hover:not(:disabled) {
      background-color: #dfdfdf;
    }
  }
  &:disabled {
    cursor: default;
    svg {
      fill: #bfbfbf;
    }
  }
`;

const Container = styled.div`
  height: var(--toolbar-height);
  width: 100vw;
  padding: 0.5rem;
  display: flex;

  & > button:not(:first-of-type) {
    margin-left: 0.5rem;
  }
`;

type ToolbarButton = {
  Icon: IconType;
  onClick: () => void;
  hex?: string;
  disabled?: boolean;
  buttonSize?: string;
};

export default Toolbar;
