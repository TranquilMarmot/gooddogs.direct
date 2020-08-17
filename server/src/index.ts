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

/** The current API token to hit Petfinder */
let currentToken: PetFinderToken | undefined = undefined;

interface DogsQueryParams {
  location?: string;
  apartmentFriendly?: string;
}

app.get("/dogs", async (req, res) => {
  if (!PETFINDER_API_KEY || !PETFINDER_API_KEY_SECRET) {
    res.status(500).json({ error: "Server config error" });
    throw new Error("API key or API key secret not configured!");
  }

  const { location, apartmentFriendly }: DogsQueryParams = req.query;

  try {
    currentToken = await refetchAuthTokenIfExpired(
      PETFINDER_API_KEY,
      PETFINDER_API_KEY_SECRET,
      currentToken
    );

    const dogs = await getFilteredDogs(
      currentToken.access_token,
      location || "98122",
      apartmentFriendly === "true"
    );

    res.json({
      animals: dogs.animals,
      pagination: {
        nextPage: dogs.pagination.current_page + 1,
      },
    });
  } catch (error) {
    console.error(error.data);

    // if we get this back, it means that the token is probably expired and we should try and fetch a new one...
    if (error.data?.detail?.includes("Access token invalid or expired")) {
      currentToken = undefined;
    }

    res.status(500).json({ error: "Error fetching dogs!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
