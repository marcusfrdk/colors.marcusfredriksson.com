import { useCallback, useEffect, useState } from "react";
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
  SaveColor,
  SavedColors,
  UnsaveColor,
} from "./ColorContext";

// Regenerate -> Cut history -> Append current state to history -> Set history index to length of history
// Undo -> Set history index to current -1 -> Set current state to history[current - 1]
// Redo -> Set history index to current + 1 -> Set current state to history[current + 1]

const LOCALSTORAGE_HISTORY = "history";
const LOCALSTORAGE_HISTORY_INDEX = "historyIndex";
const LOCALSTORAGE_SAVED_COLORS = "savedColors";

const ColorProvider = ({ children }: Props) => {
  // STATE
  const [stateColors, setStateColors] = useState<Color[]>([]);
  const [stateHistory, setStateHistory] = useState<History>([]);
  const [stateHistoryIndex, setStateHistoryIndex] = useState<number>(0);
  const [stateLoaded, setStateLoaded] = useState(false);
  const [stateSavedColors, setStateSavedColors] = useState<SavedColors>([]);

  // FUNCTIONS

  // Support functions
  const saveState = useCallback((newHistory: History, newIndex: number) => {
    localStorage.setItem(LOCALSTORAGE_HISTORY, JSON.stringify(newHistory));
    localStorage.setItem(LOCALSTORAGE_HISTORY_INDEX, JSON.stringify(newIndex));
  }, []);

  const updateCurrentState = useCallback(
    (newState: Color[]) => {
      const newHistory = [...stateHistory]
        .slice(0, stateHistoryIndex + 1)
        .map((history, index) =>
          index === stateHistoryIndex ? newState : history
        );
      setStateColors(newState);
      setStateHistory(newHistory);
      saveState(newHistory, stateHistoryIndex);
    },
    [saveState, stateHistory, stateHistoryIndex]
  );

  const addColor: AddColor = useCallback(() => {
    const newColor: Color = { hex: generateRandomHex(), locked: false };
    const newColors = [...stateColors, newColor];
    updateCurrentState(newColors);
  }, [stateColors, updateCurrentState]);

  const removeColor: RemoveColor = useCallback(
    (index) => {
      const newColors = [...stateColors].filter((_, i) => i !== index);
      updateCurrentState(newColors);
    },
    [stateColors, updateCurrentState]
  );

  const saveColor: SaveColor = (hex) => {
    const newState = [...stateSavedColors, hex];
    setStateSavedColors(newState);
    localStorage.setItem(LOCALSTORAGE_SAVED_COLORS, JSON.stringify(newState));
  };

  const unsaveColor: UnsaveColor = (hex) => {
    const newState = [...stateSavedColors].filter((f) => f !== hex);
    setStateSavedColors(newState);
    localStorage.setItem(LOCALSTORAGE_SAVED_COLORS, JSON.stringify(newState));
  };

  const resetColors: ResetColors = useCallback(() => {
    const newColors = [{ hex: generateRandomHex(), locked: false }];
    const newHistory = [newColors];
    setStateHistory(newHistory);
    setStateHistoryIndex(0);
    setStateColors(newHistory[0]);
    localStorage.removeItem(LOCALSTORAGE_HISTORY);
    localStorage.removeItem(LOCALSTORAGE_HISTORY_INDEX);
  }, []);

  const toggleColorLock: ToggleColorLock = useCallback(
    (index) => {
      const newColors = [...stateColors].map((color, i) =>
        i === index ? { ...color, locked: !color.locked } : color
      );
      updateCurrentState(newColors);
    },
    [stateColors, updateCurrentState]
  );

  // History altering functions
  const regenerateColors: RegenerateColors = useCallback(() => {
    const newColors = [...stateColors].map((color) =>
      color.locked ? color : { ...color, hex: generateRandomHex() }
    );
    const newHistory = [...stateHistory].slice(0, stateHistoryIndex + 1);
    newHistory.push(newColors);
    const newIndex = newHistory.length - 1;

    setStateHistory(newHistory);
    setStateHistoryIndex(newIndex);
    setStateColors(newHistory[newIndex]);
    saveState(newHistory, newIndex);
  }, [stateColors, stateHistory, stateHistoryIndex, saveState]);

  const undoHistory: UndoHistory = useCallback(() => {
    if (stateHistoryIndex <= 0) return;
    const newIndex = stateHistoryIndex - 1;
    const newColors = stateHistory[newIndex];
    setStateHistoryIndex(newIndex);
    setStateColors(newColors);
    saveState(stateHistory, newIndex);
  }, [stateHistoryIndex, stateHistory, saveState]);

  const redoHistory: RedoHistory = useCallback(() => {
    if (stateHistoryIndex >= stateHistory.length - 1) return;
    const newIndex = stateHistoryIndex + 1;
    const newColors = stateHistory[newIndex];
    setStateHistoryIndex(newIndex);
    setStateColors(newColors);
    saveState(stateHistory, newIndex);
  }, [stateHistoryIndex, stateHistory, saveState]);

  // EFFECTS

  // Load data on first load
  useEffect(() => {
    try {
      const storedSavedColors = localStorage.getItem(LOCALSTORAGE_SAVED_COLORS);
      const storedHistory = localStorage.getItem(LOCALSTORAGE_HISTORY);
      const storedHistoryIndex = localStorage.getItem(
        LOCALSTORAGE_HISTORY_INDEX
      );

      const saved = storedSavedColors ? JSON.parse(storedSavedColors) : [];
      setStateSavedColors(saved);

      if (!storedHistory || !storedHistoryIndex) return resetColors();

      const history = JSON.parse(storedHistory);
      const historyIndex = parseInt(storedHistoryIndex) ?? 0;
      const colors = history[historyIndex];

      setStateHistory(history ? history : []);
      setStateHistoryIndex(historyIndex);
      setStateColors(colors ?? [{ hex: generateRandomHex(), locked: false }]);
    } catch (err) {
      process.env.NODE_ENV === "development" && console.log(err);
      resetColors();
    }
    setStateLoaded(true);
  }, [stateLoaded, resetColors]);

  // Regenerate colors when spacebar is pressed
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === " ") regenerateColors();
      if (event.key === "ArrowRight") redoHistory();
      if (event.key === "ArrowLeft") undoHistory();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [regenerateColors, undoHistory, redoHistory]);

  return (
    <ColorContext.Provider
      value={{
        colors: stateColors,
        history: stateHistory,
        historyIndex: stateHistoryIndex,
        savedColors: stateSavedColors,
        addColor,
        removeColor,
        resetColors,
        toggleColorLock,
        regenerateColors,
        undoHistory,
        redoHistory,
        saveColor,
        unsaveColor,
        canRedo: stateHistoryIndex < stateHistory.length - 1,
        canUndo: stateHistoryIndex > 0,
        canReset: stateColors.length > 1 || stateHistory.length > 1,
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
