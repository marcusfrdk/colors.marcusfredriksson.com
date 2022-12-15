/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from "@emotion/react";
import { CSSProperties } from "react";

const Spinner = ({
  size = "1.5rem",
  duration = 1.2,
  color = "var(--text-strong)",
  ...props
}: SpinnerProps) => {
  const containerCSS = css`
    height: ${size};
    width: ${size};
    position: relative;
    div {
      animation: spinner ${duration}s linear infinite;
      transform-origin: 0 -140%;
      height: 25%;
      width: 10.5%;
      background-color: ${color};
      position: absolute;
      border-radius: 99rem;
      left: 50%;
      top: 85%;
      transform: translate(-50%, -50%);
    }
    @keyframes spinner {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    ${props.css}
  `;

  return (
    <div css={containerCSS} style={props.style}>
      {Array(12)
        .fill([])
        .map((_, i) => (
          <div
            key={i}
            style={{
              rotate: `calc(360 / 12 * ${i}deg)`,
              animationDelay: `-${duration - (duration / 12) * i}s`,
            }}
          />
        ))}
    </div>
  );
};

type SpinnerProps = {
  size?: string;
  duration?: number;
  color?: string;
  style?: CSSProperties;
  css?: SerializedStyles;
};

export default Spinner;
