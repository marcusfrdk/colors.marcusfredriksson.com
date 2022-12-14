import styled from "@emotion/styled";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  updateColor: (value: string, ignoreHistory?: boolean) => void;
};

const InfoHistory = ({ history = [], setHistory, updateColor }: Props) => {
  useEffect(() => {
    const stored = localStorage.getItem("info-history");
    if (!stored) return;
    try {
      const h = JSON.parse(stored);
      if (Array.isArray(h) && h.length > 0) setHistory(h);
    } catch (err) {
      return;
    }
  }, []);

  return (
    <Container style={{ marginBottom: history.length === 0 ? "1rem" : "2rem" }}>
      {history.map((hex, index) => (
        <Block
          key={index}
          style={{ backgroundColor: hex }}
          onClick={() => updateColor(hex)}
        />
      ))}
    </Container>
  );
};

const Block = styled.div`
  min-height: 3rem;
  min-width: 3rem;
  background-color: var(--neutrals-50);
  border-radius: 0.5rem;
  cursor: pointer;
  scroll-snap-align: start;
  &:not(:last-of-type) {
    margin-right: 0.5rem;
  }
`;

const Container = styled.section`
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  padding-bottom: 1rem;
`;

export default InfoHistory;
