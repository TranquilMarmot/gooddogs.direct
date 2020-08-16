export interface Animal {
  id: number;
  organization_id: string;
  url: string;
  type: Species;
  species: Species;
  breeds: Breeds;
  colors: Colors;
  age: Age;
  gender: Gender;
  size: Size;
  coat: null | Coat;
  attributes: Attributes;
  environment: Environment;
  tags: string[];
  name: string;
  description: null | string;
  organization_animal_id: null | string;
  photos: Photo[];
  primary_photo_cropped: Photo | null;
  videos: any[];
  status: Status;
  status_changed_at: string;
  published_at: string;
  distance: null;
  contact: Contact;
  _links: AnimalLinks;

  fullDescription?: string;
}

export interface AnimalLinks {
  self: Next;
  type: Next;
  organization: Next;
}

export interface Next {
  href: string;
}

export enum Age {
  Baby = "Baby",
  Young = "Young",
  Adult = "Adult",
  Senior = "Senior",
}

export interface Attributes {
  spayed_neutered: boolean;
  house_trained: boolean;
  declawed: null;
  special_needs: boolean;
  shots_current: boolean;
}

export interface Breeds {
  primary: string;
  secondary: null | string;
  mixed: boolean;
  unknown: boolean;
}

export interface Colors {
  primary: null | string;
  secondary: null | string;
  tertiary: null | string;
}

export enum Coat {
  Short = "short",
  Medium = "medium",
  Long = "long",
  Wire = "wire",
  Hairless = "hairless",
  Curly = "curly",
}

export interface Contact {
  email: string;
  phone: null | string;
  address: Address;
}

export interface Address {
  address1: null | string;
  address2: null | string;
  city: string;
  state: string;
  postcode: string;
  country: Country;
}

export enum Country {
  Us = "US",
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

export interface Photo {
  small: string;
  medium: string;
  large: string;
  full: string;
}

export enum Size {
  ExtraLarge = "Extra Large",
  Large = "Large",
  Medium = "Medium",
  Small = "Small",
}

export enum Species {
  Dog = "Dog",
}

export enum Status {
  Adoptable = "adoptable",
  Adopted = "adopted",
}
