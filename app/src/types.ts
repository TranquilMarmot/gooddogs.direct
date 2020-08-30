export interface Animal {
  id: number;
  name: string;
  description: string | null;
  url: string;
  source: string;
  photos: {
    url: string;
  }[];
  breeds: {
    primary: string;
    secondary: string;
  };
  gender: Gender;
  distance: number;
  environment: Environment;
}

export interface AnimalState {
  location: string;
  apartmentFriendly: boolean;
  pets: Animal[];
  loading: boolean;
  currentPage: number;
  error: boolean;
}

export interface ServerResponse {
  animals: Animal[];
  pagination: {
    nextPage: number;
  };
}

export interface Environment {
  children: boolean | null;
  dogs: boolean | null;
  cats: boolean | null;
}

export enum Gender {
  Female = "Female",
  Male = "Male",
  Unknown = "Unknown",
}
