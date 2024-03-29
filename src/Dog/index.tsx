/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Animal } from "../types";
import Info from "./Info";
import GoodWith from "./GoodWith";

import { ReactComponent as DogLookIcon } from "../images/dog_look.svg";
import { ReactComponent as ExternalIcon } from "../images/external.svg";
import Card from "../Card";

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

  & .carousel .slider-wrapper {
    border-radius: 50%;
  }

  & .carousel.carousel-slider .control-arrow:hover {
    background: none;
  }
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

const breedStyle = css`
  text-align: center;
  margin-top: 10px;

  font-family: "Alata", sans-serif;
`;

const descriptionStyle = css`
  margin-top: 15px;
  flex: 1;

  font-family: "Alata", sans-serif;
`;

const linkStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  padding-top: 10px;
  padding-bottom: 3px;

  color: #111;

  & :visited {
    color: #111;
  }
`;

const externalIconStyle = css`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;

interface DogProps {
  dog: Animal;
}

const Dog: FunctionComponent<DogProps> = ({ dog }) => {
  return (
    <Card title={dog.name} url={dog.url}>
      {dog.photos && dog.photos.length !== 0 ? (
        <Carousel
          css={carouselStyle}
          swipeable
          emulateTouch
          showStatus={false}
          showThumbs={false}
          infiniteLoop={dog.photos.length > 1}
          showIndicators={dog.photos.length > 1}
        >
          {dog.photos.map((photo) => (
            <div key={`dog-photo-${photo}`}>
              <img alt={`${dog.name}`} css={imageStyle} src={photo.url} />
            </div>
          ))}
        </Carousel>
      ) : (
        <div css={noImageContainerStyle}>
          <DogLookIcon />
          No Image
        </div>
      )}

      <div css={breedStyle}>
        {dog.breeds.primary}
        {dog.breeds.secondary ? ` / ${dog.breeds.secondary}` : ""}
      </div>
      <Info distance={dog.distance} gender={dog.gender} />
      <div css={descriptionStyle}>
        {dog.description && dog.description.length > 0
          ? dog.description
          : "(no description)"}
      </div>
      <GoodWith environment={dog.environment} />
      <a
        css={linkStyle}
        href={dog.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on {dog.source}
        <ExternalIcon css={externalIconStyle} />
      </a>
    </Card>
  );
};

export default Dog;
