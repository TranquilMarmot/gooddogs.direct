/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Phil1 from "../../images/phil1.jpg";
import Phil2 from "../../images/phil2.jpg";
import Phil3 from "../../images/phil3.jpg";
import Phil4 from "../../images/phil4.jpg";
import Phil5 from "../../images/phil5.jpg";
import Phil6 from "../../images/phil6.jpg";

const carouselContainerStyle = css`
  width: 250px;
  height: 250px;

  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  & .carousel .slider-wrapper {
    border-radius: 15px;
  }
`;

const slideshowImageStyle = css`
  width: 250px;
  height: 250px;
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
      <div css={carouselContainerStyle}>
        <Carousel
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          autoPlay
          stopOnHover
          interval={5000}
          showThumbs={false}
        >
          <div>
            <img
              css={slideshowImageStyle}
              alt="Phil looking sweet in the sun"
              src={Phil1}
            />
          </div>
          <div>
            <img
              css={slideshowImageStyle}
              alt="Me and Phil looking happy"
              src={Phil2}
            />
          </div>
          <div>
            <img
              css={slideshowImageStyle}
              alt="Phil with puppy dog eyes"
              src={Phil3}
            />
          </div>
          <div>
            <img
              css={slideshowImageStyle}
              alt="Phil playing some Pac-man"
              src={Phil4}
            />
          </div>
          <div>
            <img
              css={slideshowImageStyle}
              alt="Phil asking me to stop writing code and take him for a walk"
              src={Phil5}
            />
          </div>
          <div>
            <img
              css={slideshowImageStyle}
              alt="Phil in his old age, loving the grass and sun"
              src={Phil6}
            />
          </div>
        </Carousel>
      </div>
      <div css={dedicationStyle}>Dedicated to Phil</div>
      <div css={yearsStyle}>2004 - 2019</div>
    </div>
  );
};

export default Phil;
