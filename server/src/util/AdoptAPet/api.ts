import { request, gql } from "graphql-request";
import { AdoptAPetResponse, Pet, PetState } from "./types";
import { Animal, Gender } from "../../types";

const adoptAPetEndpoint = "https://hasura.adoptapet.com/v1/graphql";

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

const getGender = (adoptAPetAnimal: Pet): Gender => {
  if (adoptAPetAnimal.sex === "m") {
    return Gender.Male;
  } else if (adoptAPetAnimal.sex === "f") {
    return Gender.Female;
  } else {
    return Gender.Unknown;
  }
};

export const getDogs = async (location = "98122", offset = 0) => {
  const queryVariables = {
    zipCode: location,
    geoRange: 100, // I think this is in miles?
    limit: 10,
    offset,
    params: {
      clan_id: [1], // dogs???
    },
  };

  const data = await request<AdoptAPetResponse>(
    adoptAPetEndpoint,
    getPetsRequestQuery,
    queryVariables
  );

  const asBaseAnimal: Animal[] = data.pets.map((adoptAPetAnimal) => ({
    id: adoptAPetAnimal.petId,
    name: adoptAPetAnimal.petName,
    description: `${adoptAPetAnimal.petDescription
      .split(" ")
      .slice(0, 20)
      .join(" ")}...`,
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
