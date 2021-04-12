/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";

import { AnimalProvider, useAnimalState } from "./State/Context";
import Error from "./Error";
import Header from "./Header";
import PetGrid from "./PetGrid";

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

const App: FunctionComponent = () => {
  const [state] = useAnimalState();

  const { error } = state;

  return (
    <div id="app-container">
      <Global styles={globalStyles} />
      <AnimalProvider>
        <Header />
        <PetGrid />
      </AnimalProvider>
      {error && <Error />}
    </div>
  );
};

export default App;
