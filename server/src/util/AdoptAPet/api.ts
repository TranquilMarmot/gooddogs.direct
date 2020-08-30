import { request, gql } from "graphql-request";
import sanitizeHtml from "sanitize-html";

import { AdoptAPetResponse, AdoptAPetAnimal } from "./types";
import { Animal, Gender } from "../../types";
import { breedFilters, descriptionFilters } from "../../ApartmentFilterLists";

/**
 * GraphQL endpoint to hit to get pets from adopt-a-pet
 * NOTE: Usage of this endpoint was reverse-engineered and it is scheduled to change
 */
const adoptAPetEndpoint = "https://hasura.adoptapet.com/v1/graphql";

/** GraphQL query to use to get pets from Adopt-a-Pet */
const getPetsRequestQuery = gql`
  query pets(
    $zipCode: String!
    $geoRange: Int!
    $params: json!
    $limit: Int
    $offset: Int
  ) {
    pets: pet_catalog_search_pets_geo(
      where: { pet_state: { _in: "available" } }
      args: {
        country_code: "US"
        geo_range: $geoRange
        location: $zipCode
        query: $params
      }
      limit: $limit
      offset: $offset
      order_by: [{ uploaded_timestamp: desc }, { pet_id: asc }]
    ) {
      petId: pet_id
      petName: pet_name
      petDescription: description
      image: primary_thumb_path
      distance: distance_km
      goodWithCats: good_with_cats_p
      goodWithDogs: good_with_dogs_p
      goodWithChildren: good_with_kids_p
      age
      sex
      primary_family {
        family_name
        slugified_family_name
        __typename
      }
      secondary_family {
        family_name
        slugified_family_name
        __typename
      }
      __typename
    }
  }
`;

/**
 * @param adoptAPetAnimal Animal to get gender for
 * @returns Gender of the given animal
 */
const getGender = (adoptAPetAnimal: AdoptAPetAnimal): Gender => {
  if (adoptAPetAnimal.sex === "m") {
    return Gender.Male;
  } else if (adoptAPetAnimal.sex === "f") {
    return Gender.Female;
  } else {
    return Gender.Unknown;
  }
};

/** Number of results to fetch at a time from adopt-a-pet */
const NumberOfResults = 10;

/**
 * HTML sanitizes and returns the first twenty words of an animal's description
 * @param adoptAPetAnimal Animal to get description for
 * @returns First twenty words of the animal's description
 */
const getDescription = (adoptAPetAnimal: AdoptAPetAnimal): string | null => {
  if (
    !adoptAPetAnimal.petDescription ||
    adoptAPetAnimal.petDescription.length === 0
  ) {
    return null;
  }

  const sanitized = sanitizeHtml(adoptAPetAnimal.petDescription, {
    allowedTags: [],
    allowedAttributes: {},
  });

  const firstTwentyWords = sanitized.split(" ").slice(0, 20).join(" ");

  return `${firstTwentyWords}...`;
};

/**
 * Given a list of animals, will filter out ones that are not apartment friendly
 * @param animals Animals to filter
 */
const applyApartmentFilter = (animals: AdoptAPetAnimal[]): AdoptAPetAnimal[] =>
  animals.filter(
    (animal) =>
      !breedFilters.some(
        (breed) =>
          animal.primary_family.family_name.toLowerCase().includes(breed) ||
          animal.secondary_family?.family_name
            .toLocaleLowerCase()
            .includes(breed)
      ) &&
      !descriptionFilters.some((descriptionFilter) =>
        animal.petDescription?.toLowerCase().includes(descriptionFilter)
      )
  );

/**
 * Get a list of animals from adopt-a-pet
 * @param location Zip Code to use for search
 * @param page Page of pets to fetch
 * @param apartmentFriendly Whether or not to apply apartment friendly filters
 */
export const getDogsFromAdoptAPet = async (
  location = "98122",
  page = 0,
  apartmentFriendly = false
) => {
  const queryVariables = {
    zipCode: location,
    geoRange: 100, // I think this is in miles?
    limit: NumberOfResults,
    offset: page * NumberOfResults,
    params: {
      clan_id: [1], // dogs???
    },
  };

  const data = await request<AdoptAPetResponse>(
    adoptAPetEndpoint,
    getPetsRequestQuery,
    queryVariables
  );

  const filtered = apartmentFriendly
    ? applyApartmentFilter(data.pets)
    : data.pets;

  const asBaseAnimal: Animal[] = filtered.map((adoptAPetAnimal) => ({
    id: adoptAPetAnimal.petId,
    name: adoptAPetAnimal.petName,
    description: getDescription(adoptAPetAnimal),
    url: `https://www.adoptapet.com/pet/${adoptAPetAnimal.petId}`,
    source: "Adopt-a-Pet",
    photos: [
      { url: `https://pet-uploads.adoptapet.com${adoptAPetAnimal.image}` },
    ],
    breeds: {
      primary: adoptAPetAnimal.primary_family.family_name,
      secondary: adoptAPetAnimal.secondary_family?.family_name || null,
    },
    gender: getGender(adoptAPetAnimal),
    distance: Math.ceil(adoptAPetAnimal.distance) * 0.621371, // km to m
    environment: {
      children: adoptAPetAnimal.goodWithChildren,
      dogs: adoptAPetAnimal.goodWithDogs,
      cats: adoptAPetAnimal.goodWithCats,
    },
  }));

  return asBaseAnimal;
};
