import GlobalStyles from "components/GlobalStyles";
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
      <Component {...pageProps} />
    </ColorProvider>
  );
};

export default App;
