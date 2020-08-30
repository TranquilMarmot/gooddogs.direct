import axios from "axios";
import cheerio from "cheerio";
import { decode } from "he";

import type { PetFinderToken, PetFinderAnimalsApiResponse } from "./types";
import { baseFilter, filterByDescription } from "./filter";
import { Animal } from "../../types";

// PetFinder API docs: https://www.petfinder.com/developers/v2/docs/

/**
 * Given an active API token, returns an axios instance that uses it
 * @param token Currently active token
 */
const api = (token?: string) =>
  axios.create({
    baseURL: "https://api.petfinder.com/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

/**
 * Checks if the given key is expired or not and, if it is, fetches a new one.
 *
 * @param apiKey Petfinder API key
 * @param apiKeySecret Petfinder API key secret
 * @param token Current auth token, if we have one
 */
export const refetchAuthTokenIfExpired = async (
  apiKey: string,
  apiKeySecret: string,
  token?: PetFinderToken
) => {
  // no token; fetch it!
  if (!token) {
    return await getAuthToken(apiKey, apiKeySecret);
  }

  // check if the token we're given is expired
  const now = new Date();
  const nowMinusFiveSeconds = new Date(now.valueOf() - 5000);
  const expired = token.expires_at < nowMinusFiveSeconds;
  if (expired) {
    return await getAuthToken(apiKey, apiKeySecret);
  }

  // getting here means the token isn't expired
  return token;
};

/**
 * Get an OAuth token from the Petfinder API
 *
 * @param apiKey Petfinder API key
 * @param apiKeySecret Petfinder API key secret
 */
const getAuthToken = async (
  apiKey: string,
  apiKeySecret: string
): Promise<PetFinderToken> => {
  const tokenResponse = await api().post<PetFinderToken>(
    "/v2/oauth2/token",
    `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiKeySecret}`
  );

  // add in the expires at...
  const now = new Date();
  const expiresInMilliseconds = tokenResponse.data.expires_in * 1000;

  return {
    ...tokenResponse.data,

    // add the expires_in value to the current date to get when the token expires
    expires_at: new Date(now.getMilliseconds() + expiresInMilliseconds),
  };
};

/**
 * Get a list of dogs around the given location.
 *
 * @param token Active Petfinder API token
 * @param location Location to use when fetching dog list
 */
export const getDogs = async (token: string, location: string, page?: number) =>
  await api(token).get<PetFinderAnimalsApiResponse>("/v2/animals", {
    params: {
      type: "dog",
      location,
      page: page || 1,
    },
  });

/**
 * Fetches the list of dogs and filters it down to extra good dogs.
 *
 * @param token Active Petfinder API token
 * @param location Location to use when fetching dog list
 */
export const getDogsFromPetFinder = async (
  token: string,
  location: string,
  page = 0,
  apartmentFriendly = false
) => {
  const dogs = await getDogs(token, location, page);

  // first, we apply a base filter to get rid of known values
  const filtered = apartmentFriendly
    ? baseFilter(dogs.data.animals)
    : dogs.data.animals;

  // then, we have to fetch the full description for all of the dogs since
  // the description that comes back in the API is truncated
  const descriptions = await Promise.all(
    filtered.map((dog) => getFullPetDescription(dog.url))
  );

  // mix the full description into the list...
  // this relies on Promise.all preserving order 😬
  for (let i = 0; i < descriptions.length; i++) {
    filtered[i].fullDescription = descriptions[i];
  }

  // then, we can filter the dogs by their full description
  const filteredByDescription = apartmentFriendly
    ? filterByDescription(filtered)
    : filtered;

  const asBaseAnimal: Animal[] = filteredByDescription.map(
    (petFinderAnimal) => ({
      id: petFinderAnimal.id,
      name: petFinderAnimal.name,

      // yes, we have to _double_ decode here...
      // i.e. apostrophes are encoded as &#39;
      // but the PetFinder API returns &amp;#39; 🤦‍♂️
      description: petFinderAnimal.description
        ? decode(decode(petFinderAnimal.description))
        : null,
      url: petFinderAnimal.url,
      source: "PetFinder",
      photos: petFinderAnimal.photos.map((photo) => ({ url: photo.large })),
      breeds: {
        primary: petFinderAnimal.breeds.primary,
        secondary: petFinderAnimal.breeds.secondary,
      },
      gender: petFinderAnimal.gender,
      distance: petFinderAnimal.distance,
      environment: petFinderAnimal.environment,
    })
  );

  return asBaseAnimal;
};

/**
 * Given the URL to a dog, will fetch the page and then pull out the full description
 * using cheerio.
 *
 * @param url URL of page to scrape description from
 */
export const getFullPetDescription = async (url: string) => {
  const page = await axios.get(url);

  const parsed = cheerio.load(page.data);

  const description = parsed("[data-test='Pet_Story_Section'] > div")
    .text()
    .trim();

  return description;
};
