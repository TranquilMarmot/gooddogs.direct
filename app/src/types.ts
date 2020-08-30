/** This is the shape of a response from our API */
export interface ServerResponse {
  animals: Animal[];
  pagination: {
    nextPage: number;
  };
}

/**
 * Represents an animal.
 *
 * NOTE: This should match `Animal` in `server/src/types.ts`
 */
export interface Animal {
  /** _Some sort_ of unique identifier for this animal */
  id: number;

  /** The animal's name */
  name: string;

  /** Description to use for the animal */
  description: string | null;

  /** URL to open for more details about the animal */
  url: string;

  /** The website that this animal came from */
  source: "PetFinder" | "Adopt-a-Pet";

  /** List of photos for the animal */
  photos: {
    /** Full URL of the image */
    url: string;
  }[];

  /** What breeds the animal is */
  breeds: {
    /** The animal's primary breed */
    primary: string;

    /** The animal's secondary breed; null if they are not mixed */
    secondary: string | null;
  };

  /** The animal's gender */
  gender: Gender;

  /** How far away (in miles) the animal is from the user */
  distance: number | null;

  /** Information about whether the animal is good with kids, dogs, cats */
  environment: Environment;
}

/** Represents the animal's gender */
export enum Gender {
  Female = "Female",
  Male = "Male",
  Unknown = "Unknown",
}

/** Represents whether or not the animal is good with children, dogs, cats */
export interface Environment {
  /** Whether or not the animal is good with children. Null value means unknown. */
  children: boolean | null;

  /** Whether or not the animal is good with dogs. Null value means unknown. */
  dogs: boolean | null;

  /** Whether or not the animal is good with cats. Null value means unknown. */
  cats: boolean | null;
}
