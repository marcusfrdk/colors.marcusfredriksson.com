import { useCallback, useLayoutEffect, useState } from "react";
import generateRandomHex from "utils/generateRandomHex";
import ColorContext, {
  AddColor,
  RandomColor,
  RegenerateColors,
  RemoveColor,
  ToggleColorLock,
} from "./ColorContext";

const MAX_NUMBER_OF_COLORS = 16;

const ColorProvider = ({ children }: Props) => {
  const [stateRandomColors, setStateRandomColors] = useState<RandomColor[]>([]);

  const generateRandomColor = (): RandomColor => {
    return {
      hex: generateRandomHex(),
      locked: false,
    };
  };

  const addColor: AddColor = useCallback(
    () =>
      setStateRandomColors((rc) =>
        rc.length < MAX_NUMBER_OF_COLORS ? [...rc, generateRandomColor()] : rc
      ),
    [setStateRandomColors]
  );

  const removeColor: RemoveColor = useCallback(
    (index) => {
      setStateRandomColors((rc) => rc.filter((_, i) => i !== index));
    },
    [setStateRandomColors]
  );

  const regenerateColors: RegenerateColors = useCallback(() => {
    const newRandomColors = stateRandomColors.map((color) => {
      if (color.locked) return color;
      return generateRandomColor();
    });

    setStateRandomColors(newRandomColors);
  }, [stateRandomColors, setStateRandomColors]);

  const toggleColorLock: ToggleColorLock = useCallback(
    (index: number) =>
      setStateRandomColors((rc) =>
        rc.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c))
      ),
    [setStateRandomColors]
  );

  useLayoutEffect(() => {
    setStateRandomColors([{ hex: generateRandomHex(), locked: false }]);
  }, [setStateRandomColors]);

  return (
    <ColorContext.Provider
      value={{
        randomColors: stateRandomColors,
        addColor,
        removeColor,
        regenerateColors,
        toggleColorLock,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default ColorProvider;
