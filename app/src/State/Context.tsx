import React, {
  createContext,
  useReducer,
  useEffect,
  FunctionComponent,
  useContext,
} from "react";

import { AnimalState } from "../types";
import Reducer from "./Reducer";
import { ActionTypes, setLocation, setApartmentFriendly } from "./Actions";
import { getStateFromLocalStorage } from "../util";

export const defaultState: AnimalState = {
  location: "",
  apartmentFriendly: false,
  pets: [],
  loading: false,
  currentPage: 1,
  error: false,
};

export const AnimalStateContext = createContext<
  [AnimalState, (action: ActionTypes) => void]
>([defaultState, () => {}]);

/**
 * Wrap components in this to provide them with the required state
 */
export const AnimalProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, defaultState);

  // on mount, get the user's location/preferences from localStorage
  useEffect(() => {
    const {
      location: storedLocation,
      apartmentFriendly: storedApartmentFriendly,
    } = getStateFromLocalStorage();

    if (storedLocation) {
      dispatch(setLocation(storedLocation));
    }

    if (storedApartmentFriendly !== null) {
      dispatch(setApartmentFriendly(storedApartmentFriendly));
    }
  }, [dispatch]);

  return (
    <AnimalStateContext.Provider value={[state, dispatch]}>
      {children}
    </AnimalStateContext.Provider>
  );
};

/**
 * Call this as a hook to return a [state, dispatch] array
 * where state is the current state of the context and dispatch can be used to dispatch
 * new events to the reducer.
 */
export const useAnimalState = () => {
  const context = useContext(AnimalStateContext);

  if (context === undefined) {
    throw new Error("useAnimalState must be used within an AnimalProvider");
  }

  return context;
};
