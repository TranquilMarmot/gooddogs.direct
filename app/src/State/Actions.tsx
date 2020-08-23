export enum Actions {
  SetLocation = "SetLocation",
  SetApartmentFriendly = "SetApartmentFriendly",
}

interface SetLocationAction {
  type: Actions.SetLocation;
  payload: {
    location: string;
  };
}

export const setLocation = (location: string): SetLocationAction => ({
  type: Actions.SetLocation,
  payload: {
    location,
  },
});

interface SetApartmentFriendlyAction {
  type: Actions.SetApartmentFriendly;
  payload: {
    apartmentFriendly: boolean;
  };
}

export const setApartmentFriendly = (
  apartmentFriendly: boolean
): SetApartmentFriendlyAction => ({
  type: Actions.SetApartmentFriendly,
  payload: {
    apartmentFriendly,
  },
});

export type ActionTypes = SetLocationAction | SetApartmentFriendlyAction;
