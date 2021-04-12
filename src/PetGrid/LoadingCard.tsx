/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";
import { FunctionComponent } from "react";

import { ReactComponent as DogBoneIcon } from "../images/dog_bone.svg";
import { noImageContainerStyle } from "../Dog";
import Card from "../Card";

const loadingCardStyle = css`
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

const LoadingCard: FunctionComponent = () => (
  <Card title="Finding good dogs..." containerStyle={loadingCardStyle}>
    <div css={loadingImageStyle}>
      <DogBoneIcon />
    </div>
  </Card>
);

export default LoadingCard;
