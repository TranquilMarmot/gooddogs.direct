/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useAsync } from "react-async";
import axios from "axios";

import { ServerResponse } from "./types";
import Dog from "./Dog";
import Loading from "./Loading";
import { FunctionComponent } from "react";

const fetchAnimals = async () =>
  (await axios.get<ServerResponse>("/dogs")).data;

const containerStyle = css`
  width: 100%;
  height: 100%;
  background-color: cyan;
`;
const dogContainer = css`
  display: flex;
  flex-wrap: wrap;
`;

const App: FunctionComponent = () => {
  const { data, error, isPending } = useAsync<ServerResponse>(fetchAnimals);

  console.log(data);

  return (
    <div css={containerStyle}>
      <header>Let's find a dog!!!</header>
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
