import { useEffect, useState } from "react";
import generateRandomHex from "utils/generateRandomHex";
import ColorContext, {
  AddColor,
  History,
  Color,
  RedoHistory,
  RegenerateColors,
  RemoveColor,
  ResetColors,
  ToggleColorLock,
  UndoHistory,
} from "./ColorContext";

// Regenerate -> Cut history -> Append current state to history -> Set history index to length of history
// Undo -> Set history index to current -1 -> Set current state to history[current - 1]
// Redo -> Set history index to current + 1 -> Set current state to history[current + 1]

const LOCALSTORAGE_HISTORY = "history";
const LOCALSTORAGE_HISTORY_INDEX = "historyIndex";
const LOCALSTORAGE_COLORS = "colors";

const ColorProvider = ({ children }: Props) => {
  // STATE
  const [stateColors, setStateColors] = useState<Color[]>([]);
  const [stateHistory, setStateHistory] = useState<History>([]);
  const [stateHistoryIndex, setStateHistoryIndex] = useState<number>(0);
  const [stateLoaded, setStateLoaded] = useState(false);

  // FUNCTIONS

  // Support functions
  const updateCurrentState = (newState: Color[]) => {
    const newHistory = [...stateHistory].map((history, index) =>
      index === stateHistoryIndex ? newState : history
    );
    setStateColors(newState);
    setStateHistory(newHistory);
  };

  const addColor: AddColor = () => {
    const newColor: Color = { hex: generateRandomHex(), locked: false };
    const newColors = [...stateColors, newColor];
    updateCurrentState(newColors);
  };

  const removeColor: RemoveColor = (index) => {
    const newColors = [...stateColors].filter((_, i) => i !== index);
    updateCurrentState(newColors);
  };

  const resetColors: ResetColors = () => {
    setStateColors([]);
    setStateHistory([]);
    setStateHistoryIndex(0);
    localStorage.removeItem(LOCALSTORAGE_HISTORY);
    localStorage.removeItem(LOCALSTORAGE_HISTORY_INDEX);
    localStorage.removeItem(LOCALSTORAGE_COLORS);
  };

  const toggleColorLock: ToggleColorLock = (index) => {
    const newColors = [...stateColors].map((color, i) =>
      i === index ? { ...color, locked: !color.locked } : color
    );
    updateCurrentState(newColors);
  };

  // History altering functions
  const regenerateColors: RegenerateColors = () => {
    const newColors = [...stateColors].map((color) =>
      color.locked ? color : { ...color, hex: generateRandomHex() }
    );
    const newHistory = [...stateHistory, newColors];
    setStateColors(newColors);
    setStateHistory(newHistory);
    setStateHistoryIndex(newHistory.length - 1);
  };

  const undoHistory: UndoHistory = () => {
    if (stateHistoryIndex === 0) return;
    const newColors = stateHistory[stateHistoryIndex - 1];
    setStateHistoryIndex(stateHistoryIndex - 1);
    setStateColors(newColors);
  };

  const redoHistory: RedoHistory = () => {
    if (stateHistoryIndex >= stateHistory.length) return;
    const newColors = stateHistory[stateHistoryIndex];
    setStateHistoryIndex(stateHistoryIndex + 1);
    setStateColors(newColors);
  };

  useEffect(() => {
    console.log("History", stateHistory);
    console.log(
      "History index",
      stateHistoryIndex,
      "out of",
      stateHistory.length
    );
  }, [stateHistory, stateHistoryIndex, stateColors]);

  // EFFECTS

  // // Save data periodically
  // useEffect(() => {}, []);

  // Load data on first load
  useEffect(() => {
    try {
      if (stateLoaded) throw new Error("Already loaded");
      const history = localStorage.getItem(LOCALSTORAGE_HISTORY);
      const historyIndex = localStorage.getItem(LOCALSTORAGE_HISTORY_INDEX);
      const colors = localStorage.getItem(LOCALSTORAGE_COLORS);
      setStateHistory(history ? JSON.parse(history) : []);
      setStateHistoryIndex(historyIndex ? parseInt(historyIndex) : 0);
      setStateColors(
        colors
          ? JSON.parse(colors)
          : [{ hex: generateRandomHex(), locked: false }]
      );
    } catch (err) {
      const color = { hex: generateRandomHex(), locked: false };
      setStateHistory([[color]]);
      setStateHistoryIndex(0);
      setStateColors([color]);
    }
    setStateLoaded(true);
  }, [stateLoaded]);

  // // Regenerate colors when spacebar is pressed
  // useEffect(() => {}, []);

  // Functions that alter history
  // const regenerateColors -> Cuts history in place, appends new colors to end of history
  // const redoHistory -> Sets history index to current + 1
  // const undoHistory -> Sets history index to current - 1

  // Functions that change current state
  // removeColor -> Removes color from stateRandomColors
  // addColor -> Adds color to stateRandomColors
  // toggleColorLock -> Toggles color lock on color
  // resetColors -> Resets all state to default values

  // const appendHistory = useCallback(() => {
  //   const newHistory = [...stateHistory, stateRandomColors];
  //   const latestIndex = newHistory.length - 1;
  //   setStateHistory(newHistory);
  //   setStateHistoryIndex(latestIndex);
  //   return [newHistory, latestIndex];
  // }, [stateHistory, stateRandomColors, setStateHistory, setStateHistoryIndex]);

  // const cutHistory = useCallback(() => {
  //   const newHistory = [
  //     ...stateHistory.slice(0, stateHistoryIndex),
  //     stateRandomColors,
  //   ];
  //   const latestIndex = newHistory.length - 1;
  //   setStateHistory(newHistory);
  //   setStateHistoryIndex(latestIndex);
  //   return [newHistory, latestIndex, stateHistoryIndex];
  // }, [
  //   stateHistory,
  //   stateHistoryIndex,
  //   stateRandomColors,
  //   setStateHistory,
  //   setStateHistoryIndex,
  // ]);

  // const generateRandomColor = useCallback((): RandomColor => {
  //   return {
  //     hex: generateRandomHex(),
  //     locked: false,
  //   };
  // }, []);

  // const addColor: AddColor = useCallback(() => {
  //   setStateRandomColors((rc) =>
  //     rc.length < MAX_NUMBER_OF_COLORS ? [...rc, generateRandomColor()] : rc
  //   );
  //   appendHistory();
  // }, [setStateRandomColors, generateRandomColor, appendHistory]);

  // const removeColor: RemoveColor = useCallback(
  //   (index) => {
  //     setStateRandomColors((rc) => rc.filter((_, i) => i !== index));
  //   },
  //   [setStateRandomColors]
  // );

  // const resetColors: ResetColors = useCallback(() => {
  //   const defaultState = [generateRandomColor()];
  //   setStateRandomColors(defaultState);
  //   setStateHistory([]);
  //   localStorage.removeItem("randomColors");
  //   localStorage.removeItem("history");
  // }, [setStateRandomColors, generateRandomColor]);

  // const regenerateColors: RegenerateColors = useCallback(() => {
  //   const newColors = stateRandomColors.map((color) => {
  //     if (color.locked) return color;
  //     return generateRandomColor();
  //   });
  //   setStateHistory((history) => [...history, stateRandomColors]);
  //   setStateRandomColors(newColors);
  //   cutHistory();
  // }, [
  //   setStateRandomColors,
  //   generateRandomColor,
  //   setStateHistory,
  //   stateRandomColors,
  //   cutHistory,
  // ]);

  // const toggleColorLock: ToggleColorLock = useCallback(
  //   (index: number) =>
  //     setStateRandomColors((rc) =>
  //       rc.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c))
  //     ),
  //   [setStateRandomColors]
  // );

  // const undoHistory: UndoHistory = useCallback(() => {
  //   console.log("Current history:", JSON.stringify(stateHistory));
  //   console.log("Undo");
  // }, [stateHistory]);

  // const redoHistory: RedoHistory = useCallback(() => {
  //   console.log("Current history:", JSON.stringify(stateHistory));
  //   console.log("Redo");
  // }, [stateHistory]);

  // useEffect(() => {
  //   // Check if spacebar is pressed
  //   const handleSpacebar = (event: KeyboardEvent) =>
  //     event.key === " " ? regenerateColors() : undefined;
  //   window.addEventListener("keydown", handleSpacebar);
  //   return () => window.removeEventListener("keydown", handleSpacebar);
  // }, [regenerateColors]);

  // // Load data
  // useEffect(() => {
  //   const defaultData = [{ hex: generateRandomHex(), locked: false }];

  //   try {
  //     const data = localStorage.getItem("randomColors");
  //     if (data) {
  //       setStateRandomColors(JSON.parse(data));
  //     } else {
  //       setStateRandomColors(defaultData);
  //     }
  //   } catch (err) {
  //     // If data is not valid json, JSON.parse throws error
  //     setStateRandomColors(defaultData);
  //   }
  // }, [setStateRandomColors]);

  // // Save data
  // useEffect(() => {
  //   localStorage.setItem("randomColors", JSON.stringify(stateRandomColors));
  //   localStorage.setItem("history", JSON.stringify(stateHistory));
  // }, [stateRandomColors, stateHistory]);

  return (
    <ColorContext.Provider
      value={{
        colors: stateColors,
        history: stateHistory,
        historyIndex: stateHistoryIndex,
        addColor,
        removeColor,
        resetColors,
        toggleColorLock,
        regenerateColors,
        undoHistory,
        redoHistory,
        canRedo: stateHistoryIndex < stateHistory.length,
        canUndo: stateHistoryIndex > 0,
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
