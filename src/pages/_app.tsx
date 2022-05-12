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
      <Component {...pageProps} />
    </ColorProvider>
  );
};

export default App;
