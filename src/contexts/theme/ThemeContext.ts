import { createContext } from "react";

interface IThemeContext {
  themeColor: string;
}

const ThemeContext = createContext<IThemeContext>({
  themeColor: "#ffffff",
});

export default ThemeContext;
