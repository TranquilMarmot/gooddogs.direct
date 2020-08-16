/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";

import { Animal } from "./types";
import { colorTertiary } from "./styles";

import { ReactComponent as DistanceIcon } from "./images/distance.svg";

interface DogProps {
  dog: Animal;
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

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

const distanceContainerStyle = css`
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
`;

const distanceIconStyle = css`
  width: 40px;
  height: 40px;
`;

const getRandomRotation = (min: number, max: number): number => {
  const rotate = Math.random() * (max - min) + min;

  return Math.random() >= 0.5 ? rotate : -rotate;
};

const Dog: FunctionComponent<DogProps> = ({ dog }) => {
  const containerRotateDeg = getRandomRotation(3, 15);

  const containerHoverRotateDeg = containerRotateDeg - containerRotateDeg / 2.5;

  const imageRotateDeg = getRandomRotation(1, 5);

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
      <div css={distanceContainerStyle}>
        <DistanceIcon css={distanceIconStyle} /> {Math.ceil(dog.distance!)}{" "}
        miles
      </div>
    </a>
  );
};

export default Dog;
