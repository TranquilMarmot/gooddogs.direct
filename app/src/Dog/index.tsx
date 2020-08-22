/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Animal } from "../types";
import Info from "./Info";
import GoodWith from "./GoodWith";

import { ReactComponent as DogLookIcon } from "../images/dog_look.svg";
import Card from "../Card";
import ImageSlideshow from "../ImageSlideshow";

const imageStyle = css`
  object-fit: cover;
  width: 200px;
  height: 200px;
`;

const carouselStyle = css`
  border-radius: 50%;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  width: 200px;
  height: 200px;
`;

/** Note: this is also used in LoadingCard */
export const noImageContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 200px;
  height: 200px;

  border: 1px solid black;
  border-radius: 50%;

  background-color: white;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const descriptionStyle = css`
  margin-top: 15px;
  flex: 1;

  font-family: "Alata", sans-serif;
`;

const imageButtonContainer = css`
  display: flex;
`;

const changeImageButtonStyle = css`
  background: none;
  border: 1px solid black;
  border-radius: 15px;

  &:hover {
    cursor: pointer;
  }
`;

interface DogProps {
  dog: Animal;
}

const Dog: FunctionComponent<DogProps> = ({ dog }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const incrementImageIndex = () => {
    if (currentImageIndex === dog.photos.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const decrementImageIndex = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(dog.photos.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <Card title={dog.name} url={dog.url}>
      {dog.photos && dog.photos.length !== 0 ? (
        // <div css={imageButtonContainer}>
        //   <button css={changeImageButtonStyle} onClick={decrementImageIndex}>
        //     &lt;
        //   </button>
        //   <ImageSlideshow
        //     imageStyles={imageStyle}
        //     currentImageIndex={currentImageIndex}
        //     imageWidthPx={200}
        //     imageHeightPx={200}
        //   >
        //     {dog.photos.map((photo) => photo.large)}
        //   </ImageSlideshow>
        //   <button css={changeImageButtonStyle} onClick={incrementImageIndex}>
        //     &gt;
        //   </button>
        // </div>
        <Carousel css={carouselStyle} swipeable emulateTouch showStatus={false}>
          {dog.photos.map((photo) => (
            <div>
              <img css={imageStyle} src={photo.large} />
            </div>
          ))}
        </Carousel>
      ) : (
        <div css={noImageContainerStyle}>
          <DogLookIcon />
          No Image
        </div>
      )}

      <Info distance={dog.distance} gender={dog.gender} />
      <div css={descriptionStyle}>
        {dog.description && dog.description.length > 0
          ? dog.description
          : "(no description)"}
      </div>
      <GoodWith environment={dog.environment} />
    </Card>
  );
};

export default Dog;
