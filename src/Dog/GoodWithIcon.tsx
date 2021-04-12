/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, PropsWithChildren } from "react";

import { ReactComponent as CheckIcon } from "../images/check.svg";
import { ReactComponent as CrossedIcon } from "../images/crossed.svg";
import { ReactComponent as QuestionIcon } from "../images/question.svg";

interface GoodWithIconProps {
  goodWith: boolean | null;
}

const containerStyle = css`
  position: relative;
`;

const goodWithIconStyle = css`
  position: absolute;
  right: 2px;
  bottom: 5px;

  width: 25px;
  height: 25px;
`;

const checkIconStyle = css`
  ${goodWithIconStyle}
  fill: #80db67;
  stroke: black;

  & path {
    fill: #80db67;
  }
`;

const crossedIconStyle = css`
  ${goodWithIconStyle}
  fill: #f47676;
  stroke: black;

  & path {
    fill: #f47676;
  }
`;

const questionIconStyle = css`
  ${goodWithIconStyle}
  fill: #eebf4e;
  stroke: black;

  & path {
    fill: #eebf4e;
  }
`;

const GoodWithIcon: FunctionComponent<PropsWithChildren<GoodWithIconProps>> = ({
  children,
  goodWith,
}) => {
  return (
    <div css={containerStyle}>
      {children}
      {goodWith === true && <CheckIcon css={checkIconStyle} />}
      {goodWith === false && <CrossedIcon css={crossedIconStyle} />}
      {goodWith === null && <QuestionIcon css={questionIconStyle} />}
    </div>
  );
};

export default GoodWithIcon;
