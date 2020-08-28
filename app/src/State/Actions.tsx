import { ServerResponse } from "../types";

export enum Actions {
  SetLocation = "SetLocation",
  SetApartmentFriendly = "SetApartmentFriendly",
  SetLoading = "SetLoading",
  OnServerResponse = "OnServerResponse",
  OnServerError = "OnServerError",
  ResetState = "ResetState",
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

interface SetLoadingAction {
  type: Actions.SetLoading;
}

export const setLoading = (): SetLoadingAction => ({
  type: Actions.SetLoading,
});

interface ResetStateAction {
  type: Actions.ResetState;
}

export const resetState = (): ResetStateAction => ({
  type: Actions.ResetState,
});

interface OnServerResponseAction {
  type: Actions.OnServerResponse;
  payload: {
    response: ServerResponse;
  };
}

export const onServerResponse = (
  response: ServerResponse
): OnServerResponseAction => ({
  type: Actions.OnServerResponse,
  payload: {
    response,
  },
});

interface OnServerErrorAction {
  type: Actions.OnServerError;
}

export const OnServerError = (): OnServerErrorAction => ({
  type: Actions.OnServerError,
});

export type ActionTypes =
  | SetLocationAction
  | SetApartmentFriendlyAction
  | SetLoadingAction
  | ResetStateAction
  | OnServerResponseAction
  | OnServerErrorAction;
