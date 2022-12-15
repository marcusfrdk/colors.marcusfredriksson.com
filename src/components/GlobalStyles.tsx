import { Global, css } from "@emotion/react";
import useDevice from "hooks/useDevice";
import { BREAKPOINT_TABLET } from "utils/constants";

export const sansSerif =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif';

export const monospace =
  'ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace';

export const serif =
  "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol";

const GlobalStyles = () => {
  const { hasChin } = useDevice();

  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          color: var(--strong);
          font-family: var(--sans-serif);
        }

        :root {
          background-color: var(--neutrals-0);
          scroll-behavior: smooth;

          --sans-serif: ${sansSerif};
          --monospace: ${monospace};
          --serif: ${serif};
          --font-regular: 400;
          --font-medium: 600;
          --font-bold: 700;

          --strong: #1c1c1c;
          --weak: #919191;
          --muted: #bababa;

          --neutrals-0: #ffffff;
          --neutrals-50: #f0f0f0;
          --neutrals-100: #e3e3e3;
          --neutrals-200: #d6d6d6;
          --neutrals-300: #c7c7c7;
          --neutrals-400: #bababa;
          --neutrals-500: #adadad;
          --neutrals-600: #a1a1a1;
          --neutrals-700: #919191;
          --neutrals-800: #858585;
          --neutrals-900: #787878;

          --primary-0: #1c1c1c;
          --primary-50: #1c1c1c;
          --primary-100: #1c1c1c;
          --primary-200: #1c1c1c;
          --primary-300: #1c1c1c;
          --primary-400: #1c1c1c;
          --primary-500: #424242;
          --primary-600: #6b6b6b;
          --primary-700: #949494;
          --primary-800: #bdbdbd;
          --primary-900: #e6e6e6;

          --blue-400: #166eda;
          --green-400: #44cd2e;
          --yellow-400: #ffb405;
          --red-400: #f31103;
          --red-500: #ca0f02;
          --purple-400: #7311e4;

          --viewport-height: 100vh;

          --header-height: 4rem;
          --toolbar-height: ${hasChin ? "6rem" : "4rem"};

          @media screen and (max-width: ${BREAKPOINT_TABLET}) {
            --header-height: 3rem;
          }
        }

        @media screen and (prefers-color-scheme: dark) {
          :root {
            --strong: #ffffff;
            --weak: #a1a1a1;
            --muted: #696969;

            --neutrals-0: #1c1c1c;
            --neutrals-50: #2c2c2c;
            --neutrals-100: #3c3c3c;
            --neutrals-200: #4c4c4c;
            --neutrals-300: #5c5c5c;
            --neutrals-400: #6c6c6c;
            --neutrals-500: #7c7c7c;
            --neutrals-600: #8c8c8c;
            --neutrals-700: #9c9c9c;
            --neutrals-800: #aaaaaa;
            --neutrals-900: #bbbbbb;

            --primary-0: #d1e3fa;
            --primary-50: #a7cbf6;
            --primary-100: #7db2f2;
            --primary-200: #5399ee;
            --primary-300: #3085ea;
            --primary-400: #166eda;
            --primary-500: #125eba;
            --primary-600: #0f4b95;
            --primary-700: #0b3b74;
            --primary-800: #08284f;
            --primary-900: #05172e;
          }
        }
        .hide-scrollbar {
          &::-webkit-scrollbar {
            display: none;
          }
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}
    />
  );
};

export default GlobalStyles;
