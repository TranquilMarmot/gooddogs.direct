/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";
import {
  FunctionComponent,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import axios from "axios";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { ServerResponse, Animal } from "./types";
import Dog from "./Dog";
import Loading from "./Loading";
import Error from "./Error";
import Header from "./Header";

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

const dogContainer = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  & .dog-card {
    background-color: #b8a3ce;
  }

  & .dog-card:nth-of-type(2n) {
    background-color: #9ab8d4;
  }
`;

const fetchAnimals = async (
  currentPets: Animal[],
  nextPage: number,
  setPets: Dispatch<SetStateAction<Animal[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCurrentPage: Dispatch<SetStateAction<number>>,
  setError: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);

  try {
    const response = (
      await axios.get<ServerResponse>("/dogs", {
        params: {
          location: "98122",
          apartmentFriendly: true,
          page: nextPage,
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
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);

  const infiniteRef = useInfiniteScroll<HTMLDivElement>({
    loading,
    hasNextPage: true,
    onLoadMore: () =>
      fetchAnimals(
        pets,
        currentPage,
        setPets,
        setLoading,
        setCurrentPage,
        setError
      ),
  });

  useEffect(() => {
    (async () => {
      await fetchAnimals(
        pets,
        currentPage,
        setPets,
        setLoading,
        setCurrentPage,
        setError
      );
    })();
  }, []);

  return (
    <div ref={infiniteRef}>
      <Global styles={globalStyles} />
      <Header
        doSearch={(location: string, apartmentFriendly: boolean) =>
          console.log(location, apartmentFriendly)
        }
      />
      {pets && (
        <div css={dogContainer}>
          {pets.map((dog) => (
            <Dog key={`dog-${dog.id}`} dog={dog} />
          ))}
        </div>
      )}
      {loading && <Loading />}
      {error && <Error />}
    </div>
  );
};

export default App;
