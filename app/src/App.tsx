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

const headerStyle = css`
  font-family: "Fredoka One", cursive;
  text-align: center;
  font-size: 70px;

  margin: 0;
  padding-top: 10px;
`;

const subHeaderStyle = css`
  font-family: "Faster One", cursive;
  text-align: center;
  font-size: 50px;

  margin: 0;
`;

const App: FunctionComponent = () => {
  const { data, error, isPending } = useAsync<ServerResponse>(fetchAnimals);

  return (
    <div css={isPending ? containerLoadingStyle : containerStyle}>
      <Global styles={globalStyles} />
      <h1 css={headerStyle}>Good Dogs</h1>
      <h2 css={subHeaderStyle}>Direct</h2>
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
