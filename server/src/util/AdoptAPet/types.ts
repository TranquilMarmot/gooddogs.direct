// Most of these were generated with https://app.quicktype.io/ via a response from Adopt-a-Pet

export interface AdoptAPetResponse {
  pets: Pet[];
}

export interface Pet {
  petId: number;
  petName: string;
  petDescription: string;
  image: string;
  distance: number;
  pet_state: PetState;
  age: string;
  sex: Sex;
  primary_family: AryFamily;
  secondary_family: AryFamily | null;
  goodWithCats: boolean | null;
  goodWithDogs: boolean | null;
  goodWithChildren: boolean | null;
  __typename: PetTypename;
}

export enum PetTypename {
  PetCatalogSearchPetsGeoReturnType = "pet_catalog_search_pets_geo_return_type",
}

export enum PetState {
  Available = "available",
}

export interface AryFamily {
  family_name: string;
  slugified_family_name: null | string;
  __typename: PrimaryFamilyTypename;
}

export enum PrimaryFamilyTypename {
  PetCatalogFamilies = "pet_catalog_families",
}

export enum Sex {
  F = "f",
  M = "m",
}
