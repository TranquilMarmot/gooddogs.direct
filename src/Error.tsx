/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";

import { ReactComponent as SadnessIcon } from "./images/sadness.svg";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const errorStyle = css`
  color: maroon;

  text-align: center;
  font-size: 30px;

  padding-top: 100px;
`;

const sadnessStyle = css`
  width: 400px;
  height: 400px;

  padding-bottom: 10px;
`;

const Error: FunctionComponent = () => (
  <div css={containerStyle}>
    <h3 css={errorStyle}>Sorry, there was an error getting pets!</h3>
    <h4 css={errorStyle}>Please try again later</h4>
    <SadnessIcon css={sadnessStyle} />
  </div>
);

export default Error;
