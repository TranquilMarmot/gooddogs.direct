import React, { FunctionComponent, useRef, useEffect } from "react";
import Vivus from "vivus";

import { ReactComponent as DogIcon } from "./images/dog.svg";

const Loading: FunctionComponent = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    new Vivus((svgRef.current as unknown) as HTMLElement, { duration: 200 });
  }, [svgRef.current]);

  return <DogIcon ref={svgRef} />;
};

export default Loading;
