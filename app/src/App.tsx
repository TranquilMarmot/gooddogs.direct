/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";
import { useAsync } from "react-async";
import axios from "axios";

import { ServerResponse } from "./types";
import Dog from "./Dog";
import Loading from "./Loading";
import Error from "./Error";
import Header from "./Header";

const fetchAnimals = async () =>
  (
    await axios.get<ServerResponse>("/dogs", {
      params: {
        location: "98122",
        apartmentFriendly: true,
      },
    })
  ).data;

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

const App: FunctionComponent = () => {
  const { data, error, isPending } = useAsync<ServerResponse>(fetchAnimals);

  return (
    <div>
      <Global styles={globalStyles} />
      <Header
        doSearch={(location: string, apartmentFriendly: boolean) =>
          console.log(location, apartmentFriendly)
        }
      />
      {isPending && <Loading />}
      {data && (
        <div css={dogContainer}>
          {data.animals.map((dog) => (
            <Dog key={`dog-${dog.id}`} dog={dog} />
          ))}
        </div>
      )}
      {error && <Error />}
    </div>
  );
};

export default App;
