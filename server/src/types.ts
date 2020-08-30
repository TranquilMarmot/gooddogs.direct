export interface Animal {
  id: number;
  name: string;
  description: string | null;
  url: string;
  source: string;
  photos: {
    url: string | null;
  }[];
  breeds: {
    primary: string;
    secondary: string | null;
  };
  gender: Gender;
  distance: number | null;
  environment: Environment;
}

export enum Gender {
  Female = "Female",
  Male = "Male",
  Unknown = "Unknown",
}

export interface Environment {
  children: boolean | null;
  dogs: boolean | null;
  cats: boolean | null;
}
