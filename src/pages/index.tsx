import styled from "@emotion/styled";
import RandomColor from "components/RandomColor";
import Toolbar from "components/Toolbar";
import useColor from "contexts/color/useColor";
import { BREAKPOINT_TABLET } from "utils/constants";
import SEO from "components/SEO";

const HomePage = () => {
  const { colors } = useColor();

  return (
    <Container>
      <SEO
        title="Colors"
        description="A web-application to generate colors, shades and extract colors from an image."
      />
      <ColorContainer>
        {colors.map((color, index) => (
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(calc(100vw / 4), 1fr));

  @media screen and (max-width: ${BREAKPOINT_TABLET}) {
    display: flex;
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
