import { useRef, useEffect, useCallback } from "react";
import axios from "axios";

import {
  ActionTypes,
  setLoading,
  onServerResponse,
  OnServerError,
} from "./State/Actions";
import { AnimalState } from "./State/StateType";
import { ServerResponse } from "./types";

/** Key used to store/retrieve the user's location from localStorage */
export const LocationLocalStorageKey = "good_dog_form_location";

/** Key used to store/retrieve the user's preference for apartment restrictions */
export const ApartmentFilterLocalStorageKey =
  "good_dog_form_apartment_only_filter";

/**
 * Store the given variables in localStorage
 *
 * @param location Location to store
 * @param apartmentFriendly Whether or not apartment friendly filter has been applied
 */
export const storeStateInLocalStorage = (
  location: string,
  apartmentFriendly: boolean
) => {
  localStorage.setItem(LocationLocalStorageKey, location);
  localStorage.setItem(ApartmentFilterLocalStorageKey, `${apartmentFriendly}`);
};

/** Get values stored in localStorage back out */
export const getStateFromLocalStorage = () => {
  const apartmentFriendly = localStorage.getItem(
    ApartmentFilterLocalStorageKey
  );

  return {
    location: localStorage.getItem(LocationLocalStorageKey),
    apartmentFriendly:
      apartmentFriendly === null ? null : apartmentFriendly === "true",
  };
};

/**
 * Returns a random number that lies within the given range
 * @param min Minimum number in range
 * @param max Maximum number in range
 */
export const getRandomNumberInRange = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

/**
 * Gets a random number and then, with a 50/50 chance, negates it
 * @param min Minimum rotation
 * @param max Maximum rotation
 */
export const getRandomRotation = (min: number, max: number): number => {
  const rotate = getRandomNumberInRange(min, max);

  return Math.random() >= 0.5 ? rotate : -rotate;
};

export const fetchAnimals = async (
  dispatch: (action: ActionTypes) => void,
  { location, apartmentFriendly, currentPage }: AnimalState
) => {
  if (location.trim().length <= 0) {
    alert("Please enter a location or find yourself with geolocation first!");
    return;
  }

  // update what's stored in localStorage for the next time the user
  // visits the site
  storeStateInLocalStorage(location, apartmentFriendly);

  dispatch(setLoading());

  try {
    const response = (
      await axios.get<ServerResponse>("/dogs", {
        params: {
          location,
          apartmentFriendly,
          page: currentPage,
        },
      })
    ).data;

    dispatch(onServerResponse(response));
  } catch (error) {
    console.error("Error fetching dogs", error);

    dispatch(OnServerError());
  }
};

/**
 * Hook that calls the given callback randomly between minDelay and maxDelay milliseconds
 *
 * Adapted from https://joshwcomeau.com/snippets/react-hooks/use-random-interval
 *
 * @param callback Callback to call
 * @param minDelay Minimum delay between calls
 * @param maxDelay Maximum delay between calls
 * @returns A callback that can be used to cancel the current interval, if there is one
 */
export const useRandomInterval = (
  callback: () => void,
  minDelay: number | null,
  maxDelay: number | null
) => {
  // current timeout (NOTE: Can this be `useState` instead?)
  const timeoutId = useRef<number>(null);

  // save a reference to the callback
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    // only actually do anything if minDelay and maxDelay are real
    if (minDelay === null || maxDelay === null) {
      return;
    }

    const handleTick = () => {
      const nextTickAt = getRandomNumberInRange(minDelay, maxDelay);

      // TypeScript (rightfully) things that setting `current` on a `ref` isn't allowed...
      // but we can totally do it anyway 🤷
      // @ts-ignore
      timeoutId.current = window.setTimeout(() => {
        savedCallback.current();
        handleTick();
      }, nextTickAt);
    };

    handleTick();

    return () => window.clearTimeout(timeoutId.current!);
  }, [minDelay, maxDelay]);

  // return a callback that can be used to cancel the current timeout
  const cancel = useCallback(() => {
    window.clearTimeout(timeoutId.current!);
  }, []);

  return cancel;
};
