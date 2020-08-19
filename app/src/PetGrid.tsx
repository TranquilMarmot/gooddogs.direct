/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";
import { Animal } from "./types";
import Dog from "./Dog";

const petContainer = css`
  display: grid;

  /* Note: This is directly correlated to the size of the Dog card! */
  grid-template-columns: repeat(auto-fill, 375px);
  justify-content: space-around;

  & .dog-card {
    background-color: #b8a3ce;
  }

  & .dog-card:nth-of-type(2n) {
    background-color: #9ab8d4;
  }
`;

interface PetGridProps {
  pets: Animal[];
}

const PetGrid: FunctionComponent<PetGridProps> = ({ pets }) => {
  return (
    <div css={petContainer}>
      {pets.map((dog) => (
        <Dog key={`dog-${dog.id}`} dog={dog} />
      ))}
    </div>
  );
};

export default PetGrid;
