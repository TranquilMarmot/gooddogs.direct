/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, Dispatch, SetStateAction } from "react";
import axios from "axios";

import { ReactComponent as GpsIcon } from "../images/gps.svg";
import { buttonStyle } from "../styles";

const findMeButtonStyle = css`
  ${buttonStyle}

  display: flex;
  align-items: center;

  margin-right: 10px;
`;

const gpsIconStyle = css`
  width: 50px;
  height: 50px;

  margin-right: 10px;
`;

/**
 * Get the user's location using the browser geolocation API
 *
 * @param setLocation Callback to call to set the user's location
 */
const getGpsLocation = (setLocation: Dispatch<SetStateAction<string>>) => {
  // TODO save this to localstorage so the user doesn't have to enter it every time
  const success = async (position: Position) => {
    var crd = position.coords;

    const zipCode = await getZipCode(crd.latitude, crd.longitude);

    setLocation(zipCode);
  };

  const error = (error: PositionError) => {
    alert(
      `There was an error fetching your location!\n\nError: ${error.message}`
    );
    console.error(
      `Error fetching location! (${error.code}): ${error.message})`
    );
  };

  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  });
};

/**
 * Reverse geocode the given lat/long to get a user's zip code.
 *
 * Uses OpenStreetMap's Nominatim; https://nominatim.org/release-docs/develop/api/Reverse/
 *
 * NOTE: Nominatum has some nice guidelines laid out here: https://operations.osmfoundation.org/policies/nominatim/
 * If this app ever actually gets usage (haha) it might be nice to switch to something else
 *
 * @param latitude The user's latitude
 * @param longitude The user's longitute
 */
const getZipCode = async (latitude: number, longitude: number) => {
  const response = await axios.get(
    "https://nominatim.openstreetmap.org/reverse",
    {
      params: {
        lat: latitude,
        lon: longitude,
        format: "json",
      },
    }
  );

  const zip = response.data.address?.postcode;

  // prefer the zip code but, if we don't get it back, fallback to lat/long
  return zip || `${latitude},${longitude}`;
};

interface GpsButtonProps {
  setLocation: Dispatch<SetStateAction<string>>;
  location: string;
}

const GpsButton: FunctionComponent<GpsButtonProps> = ({
  setLocation,
  location,
}) => {
  return (
    <button
      type="button"
      onClick={() => getGpsLocation(setLocation)}
      css={findMeButtonStyle}
    >
      <GpsIcon css={gpsIconStyle} />
      {location.length === 0 ? "Find me!" : `You're at... ${location}!`}
    </button>
  );
};

export default GpsButton;
