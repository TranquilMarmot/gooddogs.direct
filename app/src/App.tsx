/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";
import { useAsync } from "react-async";
import axios from "axios";

import { ServerResponse } from "./types";
import Dog from "./Dog";
import Loading from "./Loading";
import { FunctionComponent } from "react";

const fetchAnimals = async () =>
  (await axios.get<ServerResponse>("/dogs")).data;

const globalStyles = css`
  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
`;

const containerStyle = css`
  background-color: #bcd0c4;
`;

const containerLoadingStyle = css`
  ${containerStyle}

  width: 100%;
  height: 100%;
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

  console.log(data);

  return (
    <div css={isPending ? containerLoadingStyle : containerStyle}>
      <Global styles={globalStyles} />
      {isPending && <Loading />}
      {data && (
        <div css={dogContainer}>
          {data.animals.map((dog) => (
            <Dog key={`dog-${dog.id}`} dog={dog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
