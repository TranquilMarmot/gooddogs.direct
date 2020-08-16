/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";

import { Animal } from "../types";
import { colorTertiary } from "../styles";
import { getRandomRotation } from "../util";
import Info from "./Info";
import GoodWith from "./GoodWith";

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

  background-color: ${colorTertiary};

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

  return (
    <a
      href={dog.url}
      target="_blank"
      rel="noopener noreferrer"
      css={backgroundRotateStyle}
    >
      <h2 css={nameStyle}>{dog.name}</h2>
      <img
        css={imageRotateStyle}
        alt={`${dog.name}`}
        src={dog.photos[0].large}
      />
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
