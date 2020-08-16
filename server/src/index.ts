import express from "express";
import dotenv from "dotenv-flow";

import type { PetFinderToken } from "./util/PetFinder/types";
import {
  refetchAuthTokenIfExpired,
  getFilteredDogs,
} from "./util/PetFinder/api";

dotenv.config();

const { PETFINDER_API_KEY, PETFINDER_API_KEY_SECRET, PORT } = process.env;

const app = express();

let currentToken: PetFinderToken | undefined = undefined;

app.get("/dogs", async (req, res) => {
  if (!PETFINDER_API_KEY || !PETFINDER_API_KEY_SECRET) {
    throw new Error("API key or API key secret not configured!");
  }

  interface DogsQueryParams {
    location?: string;
  }

  const { location }: DogsQueryParams = req.query;

  try {
    currentToken = await refetchAuthTokenIfExpired(
      PETFINDER_API_KEY,
      PETFINDER_API_KEY_SECRET,
      currentToken
    );

    const dogs = await getFilteredDogs(
      currentToken.access_token,
      location || "98122"
    );

    res.json(dogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching dogs!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
