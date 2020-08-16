/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";
import { Animal } from "./types";

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

  background-color: salmon;
`;

const nameStyle = css`
  text-align: center;
`;

const imageStyle = css`
  object-fit: cover;
  width: 200px;
  height: 200px;
`;

const getRandomRotation = (min: number, max: number): number => {
  const rotate = Math.random() * (max - min) + max;

  return Math.random() >= 0.5 ? rotate : -rotate;
};

const Dog: FunctionComponent<DogProps> = ({ dog }) => {
  const backgroundRotate = getRandomRotation(5, 15);
  const imageRotate = getRandomRotation(1, 5);

  const backgroundRotateStyle = css`
    ${containerStyle}
    transform: rotate(${backgroundRotate}deg);
  `;

  const imageRotateStyle = css`
    ${imageStyle}
    transform: rotate(${imageRotate}deg);
  `;

  return (
    <div css={backgroundRotateStyle}>
      <h2 css={nameStyle}>{dog.name}</h2>
      <img css={imageRotateStyle} src={dog.photos[0].large} />
    </div>
  );
};

export default Dog;
