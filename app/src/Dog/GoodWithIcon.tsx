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
  right: 5px;
  bottom: 10px;

  width: 30px;
  height: 30px;
`;

const checkIconStyle = css`
  ${goodWithIconStyle}
  fill: green;

  & path {
    fill: green;
  }
`;

const crossedIconStyle = css`
  ${goodWithIconStyle}
  fill: red;

  & path {
    fill: red;
  }
`;

const questionIconStyle = css`
  ${goodWithIconStyle}
  fill: blue;

  & path {
    fill: blue;
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
