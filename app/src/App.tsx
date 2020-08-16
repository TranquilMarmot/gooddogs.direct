/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";
import { useAsync } from "react-async";
import axios from "axios";

import { ServerResponse } from "./types";
import Dog from "./Dog";
import Loading from "./Loading";
import { FunctionComponent } from "react";
import { colorPrimary } from "./styles";

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
  background-color: ${colorPrimary};
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
