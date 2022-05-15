import styled from "@emotion/styled";
import useMessage from "contexts/message/useMessage";
import copyToClipboard from "utils/copyToClipboard";
import hexToCmyk from "utils/hexToCmyk";
import hexToHsl from "utils/hexToHsl";
import hexToRgba from "utils/hexToRgba";

const ColorMode = ({ mode, hex, margin }: Props) => {
  const { newToast } = useMessage();

  const functions: Record<ModeType, string> = {
    hex: hex,
    rgb: Object.values(hexToRgba(hex)).join(", "),
    hsl: Object.values(hexToHsl(hex)).join(", "),
    cmyk: Object.values(hexToCmyk(hex)).join(", "),
  };

  const handleCopy = () => {
    const success = copyToClipboard(functions[mode]);
    newToast(
      success
        ? `${mode.toUpperCase()} copied to clipboard`
        : "Failed to copy to clipboard"
    );
  };

  return (
    <Container style={{ margin }} onClick={handleCopy}>
      <Mode>{mode.toUpperCase()}</Mode>
      <Values>{functions[mode].toUpperCase()}</Values>
    </Container>
  );
};

const Mode = styled.p`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  background-color: var(--neutrals-50);
  color: var(--weak);
  margin-right: 1rem;
  min-width: 5rem;
  justify-content: center;
`;

const Values = styled.p`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  height: fit-content;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
`;

const Container = styled.div`
  display: flex;
  height: 3rem;
  margin-bottom: 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
  overflow: hidden;
  @media screen and (hover: hover) {
    &:hover {
      & > p:last-of-type {
        background-color: var(--neutrals-50);
      }
    }
  }
`;

type ModeType = "cmyk" | "rgb" | "hsl" | "hex";

type Props = {
  mode: ModeType;
  hex: string;
  margin?: string;
};

export default ColorMode;
