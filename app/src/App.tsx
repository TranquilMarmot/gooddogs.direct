/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";
import { FunctionComponent, useState, Dispatch, SetStateAction } from "react";
import axios from "axios";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { ServerResponse, Animal } from "./types";
import Error from "./Error";
import Header from "./Header";
import PetGrid from "./PetGrid";
import { storeStateInLocalStorage } from "./util";
import { useAnimalState } from "./State/Context";

const globalStyles = css`
  html,
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;

    background-color: #bcd0c4;
  }

  #root {
    min-height: 100%;
  }
`;

const fetchAnimals = async (
  location: string,
  apartmentFriendly: boolean,
  currentPets: Animal[],
  page: number,
  setPets: Dispatch<SetStateAction<Animal[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCurrentPage: Dispatch<SetStateAction<number>>,
  setError: Dispatch<SetStateAction<boolean>>
) => {
  if (location.trim().length <= 0) {
    alert("Please enter a location or find yourself with geolocation first!");
    return;
  }

  // update what's stored in localStorage for the next time the user
  // visits the site
  storeStateInLocalStorage(location, apartmentFriendly);

  setLoading(true);

  try {
    const response = (
      await axios.get<ServerResponse>("/dogs", {
        params: {
          location,
          apartmentFriendly,
          page: page,
        },
      })
    ).data;

    setPets(currentPets.concat(response.animals));
    setLoading(false);
    setCurrentPage(response.pagination.nextPage);
  } catch (error) {
    console.error("Error fetching dogs", error);

    setError(true);
    setPets([]);
    setLoading(false);
    setCurrentPage(1);
  }
};

const App: FunctionComponent = () => {
  const [pets, setPets] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);

  const [state] = useAnimalState();

  const { location, apartmentFriendly } = state;

  const doFetchAnimals = () => {
    fetchAnimals(
      location,
      apartmentFriendly,
      pets,
      currentPage,
      setPets,
      setLoading,
      setCurrentPage,
      setError
    );
  };

  const infiniteRef = useInfiniteScroll<HTMLDivElement>({
    loading,
    hasNextPage: pets.length > 0,
    onLoadMore: doFetchAnimals,
  });

  return (
    <div ref={infiniteRef} id="app-container">
      <Global styles={globalStyles} />
      <Header
        doSearch={() => {
          setPets([]);
          doFetchAnimals();
        }}
      />
      {pets && <PetGrid pets={pets} loading={loading} />}
      {error && <Error />}
    </div>
  );
};

export default App;
