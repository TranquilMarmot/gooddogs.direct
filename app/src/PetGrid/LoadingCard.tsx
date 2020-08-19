/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";
import { FunctionComponent, useState } from "react";

import { ReactComponent as DogBoneIcon } from "../images/dog_bone.svg";
import {
  containerStyle as dogCardContainerStyle,
  noImageContainerStyle,
  nameStyle,
} from "../Dog";
import { getRandomRotation } from "../util";

const loadingCardStyle = css`
  ${dogCardContainerStyle}

  /** Note: this will probably have to be adjusted as card sizes change! */
    min-height: 500px;
`;

const loadingGradientAnimation = keyframes`
    0% {
        background-position:0% 50%
    }

    50% {
        background-position:100% 50%
    }
    
    100% {
        background-position:0% 50%
    }
`;

const loadingImageStyle = css`
  ${noImageContainerStyle}

  background: linear-gradient(270deg, #9ab8d4, #b8a3ce);
  background-size: 400% 400%;
  animation: ${loadingGradientAnimation} 2s ease infinite;
`;

const LoadingCard: FunctionComponent = () => {
  const [containerRotateDeg] = useState(getRandomRotation(3, 7));
  const [containerHoverRotateDeg] = useState(
    containerRotateDeg - containerRotateDeg / 2.5
  );

  const containerRotateStyle = css`
      ${loadingCardStyle}
      transform: rotate(${containerRotateDeg}deg);
  
      &:hover {
        transform: rotate(${containerHoverRotateDeg}deg);
      }
    `;

  return (
    <div className="dog-card" css={containerRotateStyle}>
      <h2 css={nameStyle}>Finding good dogs...</h2>
      <div css={loadingImageStyle}>
        <DogBoneIcon />
      </div>
    </div>
  );
};

export default LoadingCard;
