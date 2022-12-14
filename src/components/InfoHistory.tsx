import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  hex: string;
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  updateColor: (value: string, ignoreHistory?: boolean) => void;
  hexIsDefined?: boolean;
};

const InfoHistory = ({
  hex,
  history = [],
  setHistory,
  updateColor,
  hexIsDefined,
}: Props) => {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("info-history");
    if (!stored) return;
    try {
      const h = JSON.parse(stored);
      if (Array.isArray(h) && h.length > 0) {
        if (hexIsDefined && h[0] != hex) {
          h.unshift(hex);
          localStorage.setItem("info-history", JSON.stringify(h));
        }
        setHistory(h);
        router.replace("/info", undefined, { shallow: true });
      }
    } catch (err) {
      return;
    }
  }, []);

  return (
    <Container>
      {history
        ? history.map((hex, index) => (
            <Block
              key={index}
              style={{ backgroundColor: hex }}
              onClick={() => updateColor(hex)}
            />
          ))
        : Array(10)
            .fill([])
            .map((_, i) => <Block key={i} />)}
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
  margin-bottom: 1rem;
`;

export default InfoHistory;
