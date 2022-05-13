import { createContext } from "react";

export type Color = { hex: string; locked: boolean };

export type AddColor = () => void;

export type RemoveColor = (index: number) => void;

export type ResetColors = () => void;

export type RegenerateColors = () => void;

export type ToggleColorLock = (index: number) => void;

export type History = Color[][];

export type RedoHistory = () => void;

export type UndoHistory = () => void;

export interface IColorContext {
  colors: Color[];
  history: History;
  historyIndex: number;
  undoHistory: UndoHistory;
  redoHistory: RedoHistory;
  addColor: AddColor;
  removeColor: RemoveColor;
  resetColors: ResetColors;
  regenerateColors: RegenerateColors;
  toggleColorLock: ToggleColorLock;
  canRedo: boolean;
  canUndo: boolean;
}

const ColorContext = createContext<IColorContext>({
  colors: [],
  history: [],
  historyIndex: 0,
  redoHistory: () => undefined,
  undoHistory: () => undefined,
  addColor: () => undefined,
  removeColor: () => undefined,
  regenerateColors: () => undefined,
  toggleColorLock: () => undefined,
  resetColors: () => undefined,
  canRedo: false,
  canUndo: false,
});

export default ColorContext;
