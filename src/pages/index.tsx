import styled from "@emotion/styled";
import RandomColor from "components/RandomColor";
import Toolbar from "components/Toolbar";
import useColor from "contexts/color/useColor";
import { BREAKPOINT_TABLET } from "utils/constants";
import Head from "next/head";

const HomePage = () => {
  const { colors } = useColor();

  return (
    <Container>
      <Head>
        <title>Talmio Colors</title>
        <meta
          name="description"
          content="Easily generate colors, shades and more."
        />
      </Head>
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
