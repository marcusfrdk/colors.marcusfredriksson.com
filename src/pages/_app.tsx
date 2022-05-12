import GlobalStyles from "components/GlobalStyles";
import Header from "components/Header";
import ColorProvider from "contexts/color/ColorProvider";
import { NextComponentType } from "next";

const App = ({
  Component,
  pageProps,
}: {
  Component: NextComponentType;
  pageProps: any;
}) => {
  return (
    <ColorProvider>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </ColorProvider>
  );
};

export default App;
