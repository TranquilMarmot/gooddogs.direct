/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";

import { Animal } from "../types";
import { getRandomRotation } from "../util";
import Info from "./Info";
import GoodWith from "./GoodWith";

import { ReactComponent as DogLookIcon } from "../images/dog_look.svg";

interface DogProps {
  dog: Animal;
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 275px;

  margin: 50px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;

  text-decoration: none;
  color: #333;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  transition: box-shadow 0.5s, transform 1s;

  &:hover {
    box-shadow: 0 14px 18px 0 rgba(0, 0, 0, 0.2),
      0 16px 40px 0 rgba(0, 0, 0, 0.19);
  }
`;

const nameStyle = css`
  text-align: center;
  font-family: "Pangolin", cursive;
`;

const imageStyle = css`
  object-fit: cover;
  width: 200px;
  height: 200px;

  border-radius: 50%;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const noImageContainerStyle = css`
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
`;

const Dog: FunctionComponent<DogProps> = ({ dog }) => {
  const containerRotateDeg = getRandomRotation(3, 7);
  const containerHoverRotateDeg = containerRotateDeg - containerRotateDeg / 2.5;

  const imageRotateDeg = 0;

  const backgroundRotateStyle = css`
    ${containerStyle}
    transform: rotate(${containerRotateDeg}deg);

    &:hover {
      transform: rotate(${containerHoverRotateDeg}deg);
    }
  `;

  const imageRotateStyle = css`
    ${imageStyle}
    transform: rotate(${imageRotateDeg}deg);
  `;

  const currentPhoto = dog.photos && dog.photos[0];

  return (
    <a
      className="dog-card"
      href={dog.url}
      target="_blank"
      rel="noopener noreferrer"
      css={backgroundRotateStyle}
    >
      <h2 css={nameStyle}>{dog.name}</h2>
      {currentPhoto ? (
        <img
          css={imageRotateStyle}
          alt={`${dog.name}`}
          src={currentPhoto.large}
        />
      ) : (
        <div css={noImageContainerStyle}>
          <DogLookIcon />
        </div>
      )}

      <Info distance={dog.distance} gender={dog.gender} />
      <div css={descriptionStyle}>
        {dog.description && dog.description.length > 0
          ? dog.description
          : "(no description)"}
      </div>
      <GoodWith environment={dog.environment} />
    </a>
  );
};

export default Dog;
