// Most of these were generated with https://app.quicktype.io/ via a response from Adopt-a-Pet
// This should mostly map to the GraphQL query that is used

export interface AdoptAPetResponse {
  pets: AdoptAPetAnimal[];
}

export interface AdoptAPetAnimal {
  petId: number;
  petName: string;
  petDescription: string;
  image: string;
  distance: number;
  pet_state: "available";
  age: string;
  sex: Sex;
  primary_family: Family;
  secondary_family: Family | null;
  goodWithCats: boolean | null;
  goodWithDogs: boolean | null;
  goodWithChildren: boolean | null;
  __typename: "pet_catalog_search_pets_geo_return_type";
}

export interface Family {
  family_name: string;
  slugified_family_name: null | string;
  __typename: "pet_catalog_families";
}

export enum Sex {
  F = "f",
  M = "m",
}
