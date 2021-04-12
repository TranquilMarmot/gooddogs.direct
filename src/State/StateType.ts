import { Animal } from "../types";

/** State to use in the context for the app */
export interface AnimalState {
  /** Currently entered location of the user */
  location: string;

  /** Whether or not the apartment friendly checkbox has been checked */
  apartmentFriendly: boolean;

  /** List of all the pets */
  pets: Animal[];

  /** Whether or not we're currently loading more pets */
  loading: boolean;

  /** Current page number that we're on */
  currentPage: number;

  /** Whether or not there was an error fetching pets; this will show an error message */
  error: boolean;
}
