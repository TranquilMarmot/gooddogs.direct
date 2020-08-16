/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";

import { Environment } from "../types";
import GoodWithIcon from "./GoodWithIcon";

import { ReactComponent as GoodDogIcon } from "../images/good_dog.svg";
import { ReactComponent as GoodCatIcon } from "../images/good_cat.svg";
import { ReactComponent as ChildIcon } from "../images/child.svg";

interface GoodWithProps {
  environment: Environment;
}

const containerStyle = css`
  display: flex;
`;

const dogCatIconStyle = css`
  width: 70px;
  height: 70px;
`;

const GoodWith: FunctionComponent<GoodWithProps> = ({ environment }) => {
  return (
    <div css={containerStyle}>
      <GoodWithIcon goodWith={environment.dogs}>
        <GoodDogIcon css={dogCatIconStyle} />
      </GoodWithIcon>
      <GoodWithIcon goodWith={environment.cats}>
        <GoodCatIcon css={dogCatIconStyle} />
      </GoodWithIcon>
      <GoodWithIcon goodWith={environment.children}>
        <ChildIcon css={dogCatIconStyle} />
      </GoodWithIcon>
    </div>
  );
};

export default GoodWith;
