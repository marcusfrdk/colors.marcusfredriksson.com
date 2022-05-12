import styled from "@emotion/styled";
import RandomColor from "components/RandomColor";
import Toolbar from "components/Toolbar";
import useColor from "contexts/color/useColor";
import { BREAKPOINT_TABLET } from "utils/constants";

const HomePage = () => {
  const { randomColors } = useColor();

  return (
    <Container>
      <ColorContainer>
        {randomColors.map((color, index) => (
          <RandomColor color={color} key={index} index={index} />
        ))}
      </ColorContainer>
      <Toolbar />
    </Container>
  );
};

const ColorContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;

  @media screen and (max-width: ${BREAKPOINT_TABLET}) {
    flex-direction: column;
  }
`;

const Container = styled.main`
  padding-top: var(--header-height);
  height: var(--viewport-height);
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

export default HomePage;
