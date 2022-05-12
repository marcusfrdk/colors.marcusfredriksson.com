import { createContext } from "react";

export type RandomColor = { hex: string; locked: boolean };

export type AddColor = () => void;

export type RemoveColor = (index: number) => void;

export type RegenerateColors = () => void;

export type ToggleColorLock = (index: number) => void;

export interface IColorContext {
  randomColors: RandomColor[];
  addColor: AddColor;
  removeColor: RemoveColor;
  regenerateColors: RegenerateColors;
  toggleColorLock: ToggleColorLock;
}

const ColorContext = createContext<IColorContext>({
  randomColors: [],
  addColor: () => undefined,
  removeColor: () => undefined,
  regenerateColors: () => undefined,
  toggleColorLock: () => undefined,
});

export default ColorContext;
