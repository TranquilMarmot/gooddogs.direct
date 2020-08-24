/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, Fragment } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import Dog from "../Dog";
import { useAnimalState } from "../State/Context";
import { fetchAnimals } from "../util";

import LoadingCard from "./LoadingCard";

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

const PetGrid: FunctionComponent = () => {
  const [state, dispatch] = useAnimalState();

  const { loading, pets } = state;

  const infiniteRef = useInfiniteScroll<HTMLDivElement>({
    loading,
    hasNextPage: pets.length !== 0,
    onLoadMore: () => fetchAnimals(dispatch, state),
  });

  return (
    <div ref={infiniteRef} css={petContainer}>
      {pets.map((dog) => (
        <Dog key={`dog-${dog.id}`} dog={dog} />
      ))}

      {/*
        Fill with a bunch of loading cards if we're loading...
        There are elegant ways to do this with array magic, but this is easier :)
      */}
      {loading && (
        <Fragment>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </Fragment>
      )}
    </div>
  );
};

export default PetGrid;
