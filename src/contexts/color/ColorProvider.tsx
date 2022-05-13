import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import generateRandomHex from "utils/generateRandomHex";
import ColorContext, {
  AddColor,
  RandomColor,
  RegenerateColors,
  RemoveColor,
  ResetColors,
  ToggleColorLock,
} from "./ColorContext";

export const MAX_NUMBER_OF_COLORS = 12;

const ColorProvider = ({ children }: Props) => {
  const [stateRandomColors, setStateRandomColors] = useState<RandomColor[]>([]);

  const generateRandomColor = useCallback((): RandomColor => {
    return {
      hex: generateRandomHex(),
      locked: false,
    };
  }, []);

  const addColor: AddColor = useCallback(
    () =>
      setStateRandomColors((rc) =>
        rc.length < MAX_NUMBER_OF_COLORS ? [...rc, generateRandomColor()] : rc
      ),
    [setStateRandomColors, generateRandomColor]
  );

  const removeColor: RemoveColor = useCallback(
    (index) => {
      setStateRandomColors((rc) => rc.filter((_, i) => i !== index));
    },
    [setStateRandomColors]
  );

  const resetColors: ResetColors = useCallback(() => {
    const defaultState = [generateRandomColor()];
    setStateRandomColors(defaultState);
    localStorage.removeItem("randomColors");
  }, [setStateRandomColors, generateRandomColor]);

  const regenerateColors: RegenerateColors = useCallback(
    () =>
      setStateRandomColors((rc) =>
        rc.map((color) => {
          if (color.locked) return color;
          return generateRandomColor();
        })
      ),
    [setStateRandomColors, generateRandomColor]
  );

  const toggleColorLock: ToggleColorLock = useCallback(
    (index: number) =>
      setStateRandomColors((rc) =>
        rc.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c))
      ),
    [setStateRandomColors]
  );

  useEffect(() => {
    // Check if spacebar is pressed
    const handleSpacebar = (event: KeyboardEvent) =>
      event.key === " " ? regenerateColors() : undefined;
    window.addEventListener("keydown", handleSpacebar);
    return () => window.removeEventListener("keydown", handleSpacebar);
  }, [regenerateColors]);

  // Load data
  useEffect(() => {
    const defaultData = [{ hex: generateRandomHex(), locked: false }];

    try {
      const data = localStorage.getItem("randomColors");
      if (data) {
        setStateRandomColors(JSON.parse(data));
      } else {
        setStateRandomColors(defaultData);
      }
    } catch (err) {
      // If data is not valid json, JSON.parse throws error
      setStateRandomColors(defaultData);
    }
  }, [setStateRandomColors]);

  // Save data
  useEffect(() => {
    localStorage.setItem("randomColors", JSON.stringify(stateRandomColors));
  }, [stateRandomColors]);

  return (
    <ColorContext.Provider
      value={{
        randomColors: stateRandomColors,
        addColor,
        removeColor,
        regenerateColors,
        toggleColorLock,
        resetColors,
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
