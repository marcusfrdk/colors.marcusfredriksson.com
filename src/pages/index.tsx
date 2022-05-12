import styled from "@emotion/styled";
import RandomColor from "components/RandomColor";
import RegenerateButton from "components/RegenerateButton";
import Toolbar, { ToolbarButton } from "components/Toolbar";
import { MAX_NUMBER_OF_COLORS } from "contexts/color/ColorProvider";
import useColor from "contexts/color/useColor";
import { AiOutlinePlus as Plus } from "react-icons/ai";
import { BREAKPOINT_TABLET } from "utils/constants";

const HomePage = () => {
  const { randomColors, addColor } = useColor();

  const buttons: ToolbarButton[] = [
    {
      Icon: Plus,
      onClick: addColor,
      tooltip: "Add a new color",
      hide: randomColors.length >= MAX_NUMBER_OF_COLORS,
    },
  ];

  return (
    <Container>
      <Toolbar buttons={buttons} />
      {randomColors.map((color, index) => (
        <RandomColor color={color} key={index} index={index} />
      ))}
      <RegenerateButton />
    </Container>
  );
};

const Container = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  @media screen and (max-width: ${BREAKPOINT_TABLET}) {
    flex-direction: column;
  }
`;

export default HomePage;
