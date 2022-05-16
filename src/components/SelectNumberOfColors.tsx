import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
import useDevice from "../hooks/useDevice";
import { MAX_NUMBER_OF_EXTRACT_COLORS } from "utils/constants";
import { FaChevronDown as Chevron } from "react-icons/fa";

const SelectNumberOfColors = ({ numberOfColors, setNumberOfColors }: Props) => {
  const { hasChin } = useDevice();

  const handleChange = (e: any) => {
    const value = parseInt(e.target.value) + 1;
    setNumberOfColors(value);
  };

  return (
    <Container style={{ bottom: hasChin ? "3rem" : "1rem" }}>
      <Text>
        Showing {numberOfColors - 1} color{numberOfColors - 1 === 1 ? "" : "s"}
      </Text>
      <Chevron size="0.5rem" color="var(--weak)" />
      <Select value={numberOfColors} onChange={handleChange}>
        {[...Array(MAX_NUMBER_OF_EXTRACT_COLORS).keys()].map((index) => {
          return (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          );
        })}
      </Select>
    </Container>
  );
};

const Text = styled.p`
  pointer-events: none;
  font-size: 0.875rem;
  margin-right: 0.5rem;
  color: var(--weak);
`;

const Select = styled.select`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
  background-color: var(--neutrals-0);
`;

const Container = styled.div`
  position: absolute;
  z-index: 5;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: var(--weak);
  display: flex;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  transition: background-color 128ms ease;
  @media screen and (hover: hover) {
    &:hover {
      background-color: var(--neutrals-50);
    }
  }
`;

type Props = {
  numberOfColors: number;
  setNumberOfColors: Dispatch<SetStateAction<number>>;
};

export default SelectNumberOfColors;
