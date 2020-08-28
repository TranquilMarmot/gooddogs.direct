import { AnimalState } from "../types";
import { ActionTypes, Actions } from "./Actions";

export default (state: AnimalState, action: ActionTypes): AnimalState => {
  switch (action.type) {
    case Actions.SetApartmentFriendly:
      return {
        ...state,
        apartmentFriendly: action.payload.apartmentFriendly,
      };

    case Actions.SetLocation:
      return {
        ...state,
        location: action.payload.location,
      };
    case Actions.SetLoading:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case Actions.ResetState:
      return {
        ...state,
        pets: [],
        currentPage: 1,
        error: false,
      };
    case Actions.OnServerResponse:
      return {
        ...state,
        loading: false,
        pets: [...state.pets, ...action.payload.response.animals],
        currentPage: action.payload.response.pagination.nextPage,
        error: false,
      };
    case Actions.OnServerError:
      return {
        ...state,
        loading: false,
        pets: [],
        currentPage: 1,
        error: true,
      };
    default:
      return state;
  }
};
