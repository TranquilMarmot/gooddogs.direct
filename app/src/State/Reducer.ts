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
    default:
      return state;
  }
};
