/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, useState, Dispatch, SetStateAction } from "react";

import GpsButton from "./GpsButton";
import { buttonStyle } from "../styles";

const locationContainerStyle = css`
  display: flex;
  align-items: center;
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

const swapLocationButtonStyle = css`
  ${buttonStyle}
  margin-left: 10px;
`;

interface LocationInputProps {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}

const LocationInput: FunctionComponent<LocationInputProps> = ({
  location,
  setLocation,
}) => {
  const [showFindMe, setShowFindMe] = useState(true);

  const swapInputs = () => {
    setShowFindMe(!showFindMe);
    setLocation("");
  };

  return (
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
            onClick={swapInputs}
          >
            Find my location automatically
          </button>
        </div>
      )}
      {showFindMe && (
        <div css={locationContainerStyle}>
          <GpsButton setLocation={setLocation} />
          or
          <button
            css={swapLocationButtonStyle}
            type="button"
            onClick={swapInputs}
          >
            Enter a location instead
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
