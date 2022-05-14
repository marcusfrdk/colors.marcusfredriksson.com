import GlobalStyles from "components/GlobalStyles";
import Header from "components/Header";
import ColorProvider from "contexts/color/ColorProvider";
import MessageProvider from "contexts/message/MessageProvider";
import ThemeProvider from "contexts/theme/ThemeProvider";
import useHeight from "hooks/useHeight";
import { NextComponentType } from "next";

const App = ({
  Component,
  pageProps,
}: {
  Component: NextComponentType;
  pageProps: any;
}) => {
  useHeight();

  return (
    <ThemeProvider>
      <ColorProvider>
        <MessageProvider>
          <GlobalStyles />
          <Header />
          <Component {...pageProps} />
        </MessageProvider>
      </ColorProvider>
    </ThemeProvider>
  );
};

export default App;
