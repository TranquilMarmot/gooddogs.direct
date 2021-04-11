import type { APIGatewayEvent, Context } from "aws-lambda";

import dotenv from "dotenv-flow";

import type { PetFinderToken } from "./util/PetFinder/types";
import {
  refetchAuthTokenIfExpired,
  getDogsFromPetFinder,
} from "./util/PetFinder/api";
import { getDogsFromAdoptAPet } from "./util/AdoptAPet/api";

dotenv.config();

const { PETFINDER_API_KEY, PETFINDER_API_KEY_SECRET, PORT } = process.env;

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

export async function handler(event: APIGatewayEvent, context: Context) {
  if (!PETFINDER_API_KEY || !PETFINDER_API_KEY_SECRET) {
    return {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "API key or API key secret not configured!",
      }),
    };
  }

  if (!event.queryStringParameters) {
    return {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Query string parameters not present",
      }),
    };
  }

  const {
    location,
    apartmentFriendly,
    page,
  }: DogsQueryParams = event.queryStringParameters;

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

    return {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        animals: dogs,
        pagination: {
          nextPage: currentPage + 1,
        },
      }),
    };
  } catch (error) {

    // if we get this back, it means that the token is probably expired and we should try and fetch a new one...
    if (error.data?.detail?.includes("Access token invalid or expired")) {
      currentToken = undefined;
    }

    return {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(error),
    };
  }
}
