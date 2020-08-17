/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, PropsWithChildren, useState } from "react";

import { useRandomInterval } from "../util";

import { SparkleType, generateSparkle } from "./SparkleUtil";
import Sparkle from "./Sparkle";

// Adapted from https://joshwcomeau.com/react/animated-sparkles-in-react/

const wrapperStyle = css`
  display: inline-block;
  position: relative;
`;

interface SparklesProps {
  /**
   * Color to render sparkles in.
   *
   * Default: #FFC700
   */
  color?: string;

  /** Whether or not to emit new sparkles */
  active?: boolean;
}

/** Render a bunch of ✨ sparkles ✨ over a component */
const Sparkles: FunctionComponent<PropsWithChildren<SparklesProps>> = ({
  color = "#FFC700",
  children,
  active = true,
}) => {
  const [sparkles, setSparkles] = useState<SparkleType[]>([]);

  // this will randomly call the given function between the two given intervals
  useRandomInterval(
    () => {
      // first, filter out any "dead" sparkles
      const now = Date.now();
      const nextSparkles = sparkles.filter((sp: SparkleType) => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });

      // push a new sparkle onto the list
      if (active) {
        nextSparkles.push(generateSparkle(color));
      }

      setSparkles(nextSparkles);
    },
    50,
    450
  );

  return (
    <div css={wrapperStyle}>
      {children}
      {sparkles.map((sparkle) => (
        <Sparkle key={`sparkle-${sparkle.id}`} sparkle={sparkle} />
      ))}
    </div>
  );
};

export default Sparkles;
