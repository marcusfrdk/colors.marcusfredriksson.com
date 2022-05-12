import { useContext } from "react";
import ColorContext from "./ColorContext";

const useColor = () => useContext(ColorContext);

export default useColor;
