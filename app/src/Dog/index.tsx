/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";

import { Animal } from "../types";
import Info from "./Info";
import GoodWith from "./GoodWith";

import { ReactComponent as DogLookIcon } from "../images/dog_look.svg";
import Card from "../Card";

const imageStyle = css`
  object-fit: cover;
  width: 200px;
  height: 200px;

  border-radius: 50%;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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

interface DogProps {
  dog: Animal;
}

const Dog: FunctionComponent<DogProps> = ({ dog }) => {
  const currentPhoto = dog.photos && dog.photos[0];

  return (
    <Card title={dog.name} url={dog.url}>
      {currentPhoto ? (
        <img css={imageStyle} alt={`${dog.name}`} src={currentPhoto.large} />
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
