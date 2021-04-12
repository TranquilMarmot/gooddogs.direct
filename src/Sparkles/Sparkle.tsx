/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";
import { FunctionComponent } from "react";

import { SparkleType } from "./SparkleUtil";

const comeInOut = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
`;

const sparkleWrapperStyle = css`
  position: absolute;
  display: block;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${comeInOut} 700ms forwards;
  }
`;

const sparkleSvgStyle = css`
  display: block;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} 1000ms linear;
  }
`;

interface SparkleProps {
  /** Sparkle to render */
  sparkle: SparkleType;
}

/** SVG path to use to render sparkle */
const path =
  "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";

/** Renders a sparkle SVG that appears, spins, and disappears */
const Sparkle: FunctionComponent<SparkleProps> = ({ sparkle }) => {
  const positionedWrapperStyle = css`
    ${sparkleWrapperStyle}
    top: ${sparkle.style.top};
    left: ${sparkle.style.left};
  `;

  return (
    <span css={positionedWrapperStyle}>
      <svg
        css={sparkleSvgStyle}
        width={sparkle.size}
        height={sparkle.size}
        viewBox="0 0 68 68"
        fill="none"
      >
        <path d={path} fill={sparkle.color} />
      </svg>
    </span>
  );
};

export default Sparkle;
