/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";
import { FunctionComponent, PropsWithChildren, useState } from "react";

import { getRandomNumberInRange, useRandomInterval } from "../util";

// Adapted from https://joshwcomeau.com/react/animated-sparkles-in-react/

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

const wrapperStyle = css`
  display: inline-block;
  position: relative;
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

type Sparkle = ReturnType<typeof generateSparkle>;

const generateSparkle = (color: string) => {
  const sparkle = {
    id: String(getRandomNumberInRange(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: getRandomNumberInRange(10, 20),
    style: {
      top: getRandomNumberInRange(0, 100) + "%",
      left: getRandomNumberInRange(0, 100) + "%",
    },
  };
  return sparkle;
};

interface SparklesProps {
  color: string;
}

const Sparkles: FunctionComponent<PropsWithChildren<SparklesProps>> = ({
  color,
  children,
}) => {
  const path =
    "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";

  const [sparkles, setSparkles] = useState(() => [generateSparkle(color)]);

  useRandomInterval(
    () => {
      const sparkle = generateSparkle(color);
      const now = Date.now();
      const nextSparkles = sparkles.filter((sp: Sparkle) => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    50,
    450
  );

  return (
    <div css={wrapperStyle}>
      {children}
      {sparkles.map((sparkle) => {
        const positionedWrapperStyle = css`
            ${sparkleWrapperStyle}
            top: ${sparkle.style.top};
            left: ${sparkle.style.left}
        `;

        return (
          <span key={`sparkle-${sparkle.id}`} css={positionedWrapperStyle}>
            <svg
              css={sparkleSvgStyle}
              width={sparkle.size}
              height={sparkle.size}
              viewBox="0 0 68 68"
              fill="none"
            >
              <path d={path} fill={color} />
            </svg>
          </span>
        );
      })}
    </div>
  );
};

export default Sparkles;
