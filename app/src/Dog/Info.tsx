/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, useState } from "react";

import { Gender } from "../types";

import { ReactComponent as DistanceIcon } from "../images/distance.svg";
import { ReactComponent as MaleIcon } from "../images/male.svg";
import { ReactComponent as FemaleIcon } from "../images/female.svg";
import { getRandomRotation } from "../util";

interface InfoProps {
  distance: number | null;
  gender: Gender;
}

const footerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

const distanceContainerStyle = css`
  display: flex;
  align-items: center;
`;

const distanceIconStyle = css`
  width: 40px;
  height: 40px;
`;

const sexIconStyle = css`
  width: 40px;
  height: 40px;
`;

const Info: FunctionComponent<InfoProps> = ({ distance, gender }) => {
  const [sexRotateDeg] = useState(getRandomRotation(2, 5));

  const sexRotateStyle = css`
    ${sexIconStyle}
    transform: rotate(${sexRotateDeg}deg);
  `;

  return (
    <div css={footerStyle}>
      <div css={distanceContainerStyle}>
        <DistanceIcon css={distanceIconStyle} /> {Math.ceil(distance!)} miles
      </div>
      <div>
        {gender === Gender.Male && <MaleIcon css={sexRotateStyle} />}
        {gender === Gender.Female && <FemaleIcon css={sexRotateStyle} />}
      </div>
    </div>
  );
};

export default Info;
