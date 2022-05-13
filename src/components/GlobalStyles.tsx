import { Global, css } from "@emotion/react";
import useDevice from "hooks/useDevice";
import { BREAKPOINT_TABLET } from "utils/constants";

const GlobalStyles = () => {
  const { hasChin } = useDevice();

  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: var(--sans-serif);
        }

        /* html {
          height: -webkit-fill-available;
        }*/

        /* body {
          min-height: 100vh;
          min-height: -webkit-fill-available;
        } */

        :root {
          background-color: var(--neutrals-0);
          scroll-behavior: smooth;
          --sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          --monospace: ui-monospace, Menlo, Monaco, "Cascadia Mono",
            "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace",
            "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New",
            monospace;
          --serif: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman,
            Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji,
            Segoe UI Emoji, Segoe UI Symbol;
          --font-normal: 400;
          --font-medium: 600;
          --font-bold: 700;

          --viewport-height: 100vh;

          --header-height: 4rem;
          --toolbar-height: ${hasChin ? "6rem" : "4rem"};

          @media screen and (max-width: ${BREAKPOINT_TABLET}) {
            --header-height: 3rem;
          }
        }
      `}
    />
  );
};

export default GlobalStyles;
