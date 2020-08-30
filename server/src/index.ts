import express from "express";
import dotenv from "dotenv-flow";
import winston from "winston";

import type { PetFinderToken } from "./util/PetFinder/types";
import {
  refetchAuthTokenIfExpired,
  getDogsFromPetFinder,
} from "./util/PetFinder/api";
import initLogging from "./logging";
import { getDogsFromAdoptAPet } from "./util/AdoptAPet/api";

dotenv.config();

const { PETFINDER_API_KEY, PETFINDER_API_KEY_SECRET, PORT } = process.env;

initLogging();

const app = express();

/** The current API token to hit Petfinder */
let currentToken: PetFinderToken | undefined = undefined;

/** Query params passed in to /dogs */
interface DogsQueryParams {
  /** Location to find dogs in */
  location?: string;

  /** Whether or not to apply the apartment friendly filter */
  apartmentFriendly?: string;

  /** Current page to fetch */
  page?: string;
}

app.get("/dogs", async (req, res) => {
  if (!PETFINDER_API_KEY || !PETFINDER_API_KEY_SECRET) {
    res.status(500).json({ error: "Server config error" });
    winston.error("API key or API key secret not configured!");
    return;
  }

  const { location, apartmentFriendly, page }: DogsQueryParams = req.query;
  const userAgent = req.get("User-Agent") || "(unknown)";

  winston.info(
    JSON.stringify({
      endpoint: "dogs",
      location,
      apartmentFriendly,
      page,
      ip: req.ip,
      userAgent,
    })
  );

  const requestStart = process.hrtime();

  const applyApartmentFriendlyFilter = apartmentFriendly === "true";
  const currentPage = page ? Number.parseInt(page, 10) : 0;
  const locationToUse = location || "98122";

  try {
    currentToken = await refetchAuthTokenIfExpired(
      PETFINDER_API_KEY,
      PETFINDER_API_KEY_SECRET,
      currentToken
    );

    const dogs = (
      await Promise.all([
        await getDogsFromPetFinder(
          currentToken.access_token,
          locationToUse,
          currentPage,
          applyApartmentFriendlyFilter
        ),
        await getDogsFromAdoptAPet(
          locationToUse,
          currentPage,
          applyApartmentFriendlyFilter
        ),
      ])
    ).flat();

    const requestEnd = process.hrtime(requestStart);

    winston.info(
      JSON.stringify({
        endpoint: "dogs",
        location,
        apartmentFriendly,
        page,
        ip: req.ip,
        userAgent,
        returnedDogs: dogs.length,
        elapsed: requestEnd,
      })
    );

    res.json({
      animals: dogs,
      pagination: {
        nextPage: currentPage + 1,
      },
    });
  } catch (error) {
    winston.error(error);

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
