/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";

import Phil1 from "../../images/phil1.jpg";
import Phil2 from "../../images/phil2.jpg";
import Phil3 from "../../images/phil3.jpg";
import Phil4 from "../../images/phil4.jpg";
import Phil5 from "../../images/phil5.jpg";
import Phil6 from "../../images/phil6.jpg";

import TimedImageSlideshow from "../../TimedImageSlideshow";

const slideshowImageStyle = css`
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const philContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 25px;
`;

const dedicationStyle = css`
  font-family: "Lobster", cursive;

  font-size: 40px;
  margin-top: 10px;
`;

const yearsStyle = css`
  font-family: "Lobster", cursive;
`;

const Phil: FunctionComponent = () => {
  return (
    <div css={philContainerStyle}>
      <TimedImageSlideshow
        imageStyles={slideshowImageStyle}
        secondsBetweenImages={5}
        imageWidthPx={250}
        imageHeightPx={250}
      >
        {Phil1}
        {Phil2}
        {Phil3}
        {Phil4}
        {Phil5}
        {Phil6}
      </TimedImageSlideshow>
      <div css={dedicationStyle}>Dedicated to Phil</div>
      <div css={yearsStyle}>2004 - 2019</div>
    </div>
  );
};

export default Phil;
