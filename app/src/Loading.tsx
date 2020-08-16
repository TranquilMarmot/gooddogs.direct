/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, useRef, useEffect } from "react";
import Vivus from "vivus";

import { ReactComponent as DogIcon } from "./images/dog.svg";

const iconContainerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const iconStyle = css`
  width: 500px;
  height: 500px;
`;

const Loading: FunctionComponent = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    new Vivus((svgRef.current as unknown) as HTMLElement, { duration: 200 });
  }, [svgRef.current]);

  return (
    <div css={iconContainerStyle}>
      <DogIcon ref={svgRef} css={iconStyle} />
    </div>
  );
};

export default Loading;
