import { Global, css } from "@emotion/react";
import { BREAKPOINT_TABLET } from "utils/constants";

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: var(--sans-serif);
        }
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

          --header-height: 4rem;
          --toolbar-height: 4rem;

          @media screen and (max-width: ${BREAKPOINT_TABLET}) {
            --header-height: 3rem;
          }
        }
      `}
    />
  );
};

export default GlobalStyles;
