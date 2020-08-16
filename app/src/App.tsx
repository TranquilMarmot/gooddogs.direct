import React from "react";
import { useAsync } from "react-async";
import axios from "axios";

import { Animal } from "./types";

interface ServerResponse {
  animals: Animal[];
  pagination: {
    nextPage: number;
  };
}

const fetchAnimals = async () =>
  (await axios.get<ServerResponse>("/dogs")).data;

function App() {
  const { data, error, isPending } = useAsync<ServerResponse>(fetchAnimals);

  return (
    <div>
      <header>Let's find a dog!!!</header>
      {data &&
        data.animals.map((dog) => (
          <div key={`dog-${dog.id}`}>
            <h2>{dog.name}</h2>
            <img src={dog.photos[0].medium} />
          </div>
        ))}
    </div>
  );
}

export default App;
