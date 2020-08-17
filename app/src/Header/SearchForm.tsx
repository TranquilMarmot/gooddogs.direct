/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import {
  FunctionComponent,
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";

import { ReactComponent as GpsIcon } from "../images/gps.svg";

import Sparkles from "../Sparkles";

interface SearchFormProps {
  doSearch: (location: string, apartmentFriendly: boolean) => void;
}

const formStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 175px;
  width: 400px;

  margin-left: 10px;
`;

const buttonStyle = css`
  padding: 10px 15px;
  font-weight: 800;
  border: 1px solid black;
  border-radius: 5px;

  background: linear-gradient(135deg, #b8a3ce 0%, #7db9e8 100%);

  &:hover {
    cursor: pointer;
  }
`;

const findMeButtonStyle = css`
  ${buttonStyle}

  display: flex;
  align-items: center;

  margin-right: 10px;
`;

const locationContainerStyle = css`
  display: flex;
  align-items: center;
`;

const gpsIconStyle = css`
  width: 50px;
  height: 50px;

  margin-right: 10px;
`;

const swapLocationButtonStyle = css`
  ${buttonStyle}
  margin-left: 10px;
`;

const inputContainerStyle = css`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const locationInputStyle = css`
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  width: 150px;
`;

const submitButtonStyle = css`
  ${buttonStyle}
  width: 100%;
`;

const onFormSubmit = (
  e: FormEvent<HTMLFormElement>,
  doSearch: (location: string, apartmentFriendly: boolean) => void,
  location: string,
  apartmentFriendly: boolean
) => {
  e.preventDefault();

  if (location.trim().length <= 0) {
    alert("Please enter a location or find yourself with geolocation first!");
  } else {
    doSearch(location, apartmentFriendly);
  }
};

const getGpsLocation = (setLocation: Dispatch<SetStateAction<string>>) => {
  const success = (pos: Position) => {
    var crd = pos.coords;

    setLocation(`${crd.latitude},${crd.longitude}`);
  };

  const error = (err: PositionError) => {
    alert(
      `There was an error fetching your location!\n\nError: ${err.message}`
    );
    console.error(`Error fetching location! (${err.code}): ${err.message})`);
  };

  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  });
};

const SearchForm: FunctionComponent<SearchFormProps> = ({ doSearch }) => {
  const [location, setLocation] = useState("");
  const [apartmentFriendly, setApartmentFriendly] = useState(true);
  const [showFindMe, setShowFindMe] = useState(true);

  return (
    <form
      css={formStyle}
      onSubmit={(e) => onFormSubmit(e, doSearch, location, apartmentFriendly)}
    >
      <div>
        {!showFindMe && (
          <div css={locationContainerStyle}>
            <div css={inputContainerStyle}>
              <label htmlFor="location-input">Enter Your Location</label>
              <input
                autoFocus
                css={locationInputStyle}
                id="location-input"
                placeholder="City, State or Zip Code"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
            </div>
            or
            <button
              css={swapLocationButtonStyle}
              type="button"
              onClick={() => setShowFindMe(true)}
            >
              Find my location automatically
            </button>
          </div>
        )}
        {showFindMe && (
          <div css={locationContainerStyle}>
            <button
              type="button"
              onClick={() => getGpsLocation(setLocation)}
              css={findMeButtonStyle}
            >
              <GpsIcon css={gpsIconStyle} />
              Find me!
            </button>
            or
            <button
              css={swapLocationButtonStyle}
              type="button"
              onClick={() => setShowFindMe(false)}
            >
              Enter a location instead
            </button>
          </div>
        )}
      </div>

      <div>
        <input
          type="checkbox"
          id="apartment-friendly-checkbox"
          checked={apartmentFriendly}
          onChange={(e) => setApartmentFriendly(e.target.checked)}
        />
        <label htmlFor="apartment-friendly-checkbox">
          Only show apartment friendly dogs
        </label>
      </div>

      <Sparkles active={location.trim().length > 0}>
        <button css={submitButtonStyle} type="submit">
          Find Good Dogs
        </button>
      </Sparkles>
    </form>
  );
};

export default SearchForm;
