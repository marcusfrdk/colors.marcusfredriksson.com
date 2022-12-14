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
    rgb: Object.values(hexToRgba(hex)).slice(0, 3).join(", "),
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
  color: var(--weak);
  font-size: 0.875rem;
  background-color: var(--neutrals-100);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
  white-space: nowrap;
`;

const Values = styled.p`
  white-space: nowrap;
`;

const Container = styled.li`
  display: flex;
  background-color: var(--neutrals-50);
  padding: 0.25rem 0.75rem 0.25rem 0.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  cursor: copy;
  margin-bottom: 1rem;
  user-select: none;
  &:not(:last-of-type) {
    margin-right: 1rem;
  }
  @media screen and (hover: hover) {
    &:hover {
      background-color: var(--neutrals-100);
      & > p:first-of-type {
        background-color: var(--neutrals-200);
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
