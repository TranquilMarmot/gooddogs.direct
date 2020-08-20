/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";

import Sparkles from "../Sparkles";

const headerStyle = css`
  font-family: "Fredoka One", cursive;
  text-align: right;
  font-size: 70px;

  margin: 0;
  padding-top: 10px;

  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;

  background: linear-gradient(135deg, #b8a3ce 0%, #7db9e8 100%);
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const subHeaderStyle = css`
  font-family: "Faster One", cursive;
  font-size: 50px;
  text-align: center;

  margin: 0;
`;

const rightAlignedSubheaderStyle = css`
  ${subHeaderStyle}
  text-align: right;
`;

interface LogoProps {
  rightAlign?: boolean;
}

const Logo: FunctionComponent<LogoProps> = ({ rightAlign = true }) => {
  return (
    <div>
      <Sparkles>
        <h1 css={headerStyle}>Good Dogs</h1>
      </Sparkles>
      <h2 css={rightAlign ? rightAlignedSubheaderStyle : subHeaderStyle}>
        Direct
      </h2>
    </div>
  );
};

export default Logo;
