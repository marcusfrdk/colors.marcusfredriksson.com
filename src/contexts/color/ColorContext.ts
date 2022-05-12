import { createContext } from "react";

export type RandomColor = { hex: string; locked: boolean };

export type AddColor = () => void;

export type RegenerateColors = () => void;

export type ToggleColorLock = (index: number) => void;

export interface IColorContext {
  randomColors: RandomColor[];
  addColor: AddColor;
  regenerateColors: RegenerateColors;
  toggleColorLock: ToggleColorLock;
}

const ColorContext = createContext<IColorContext>({
  randomColors: [],
  addColor: () => undefined,
  regenerateColors: () => undefined,
  toggleColorLock: () => undefined,
});

export default ColorContext;
