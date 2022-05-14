import { createContext } from "react";

export type Color = { hex: string; locked: boolean };

export type AddColor = () => void;

export type RemoveColor = (index: number) => void;

export type ResetColors = () => void;

export type RegenerateColors = () => void;

export type ToggleColorLock = (index: number) => void;

export type History = Color[][];

export type SavedColors = string[];

export type SaveColor = (hex: string) => void;

export type UnsaveColor = (hex: string) => void;

export type RedoHistory = () => void;

export type UndoHistory = () => void;

export interface IColorContext {
  colors: Color[];
  savedColors: SavedColors;
  history: History;
  historyIndex: number;
  undoHistory: UndoHistory;
  redoHistory: RedoHistory;
  addColor: AddColor;
  removeColor: RemoveColor;
  resetColors: ResetColors;
  regenerateColors: RegenerateColors;
  toggleColorLock: ToggleColorLock;
  saveColor: SaveColor;
  unsaveColor: UnsaveColor;
  canRedo: boolean;
  canUndo: boolean;
  canReset: boolean;
}

const ColorContext = createContext<IColorContext>({
  colors: [],
  savedColors: [],
  history: [],
  historyIndex: 0,
  redoHistory: () => undefined,
  undoHistory: () => undefined,
  addColor: () => undefined,
  removeColor: () => undefined,
  regenerateColors: () => undefined,
  toggleColorLock: () => undefined,
  resetColors: () => undefined,
  saveColor: () => undefined,
  unsaveColor: () => undefined,
  canRedo: false,
  canUndo: false,
  canReset: false,
});

export default ColorContext;
