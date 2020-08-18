import { Animal } from "./types";

/** Breeds to filter out */
const breedFilters = [
  "Pit Bull",
  "Chihuahua",
  "Rottweiler",
  "German Shepherd",
  "Great Dane",
];

/** Descriptions to filter out */
const descriptionFilters = [
  "fenced yard",
  "bonded pair",
  "no apartment",
  "not suitable for an apartment",
  "requires another dog",
];

/**
 * Apply a base filter to a list of animals.
 * @param animals List of animals to filter
 */
export const baseFilter = (animals: Animal[]): Animal[] =>
  animals.filter(
    (animal) =>
      !breedFilters.some(
        (breed) =>
          animal.breeds.primary.toLowerCase().includes(breed.toLowerCase()) ||
          animal.breeds.secondary?.toLowerCase().includes(breed.toLowerCase())
      )
  );

/**
 * Filter animals by their description.
 *
 * This is done separately from the base filter since downloading the description is costly,
 * and we only want to download it if we actually want to.
 *
 * @param animals List of animals to filter
 */
export const filterByDescription = (animals: Animal[]) =>
  animals.filter(
    (animal) =>
      !descriptionFilters.some(
        (descriptionFilter) =>
          animal.description?.toLowerCase().includes(descriptionFilter) ||
          animal.fullDescription?.toLowerCase().includes(descriptionFilter)
      )
  );
