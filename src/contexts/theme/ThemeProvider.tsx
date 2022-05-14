import { useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({ children }: Props) => {
  const [stateThemeColor, setStateThemeColor] = useState("#ffffff");

  useEffect(() => {
    const handleChange = (e: any) => {
      setStateThemeColor(e.matches ? "#1c1c1c" : "#ffffff");
    };
    const listener = window.matchMedia("(prefers-color-scheme: dark)");
    listener.addEventListener("change", handleChange);
    handleChange(listener);
    return () => listener.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        themeColor: stateThemeColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default ThemeProvider;
