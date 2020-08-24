/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, useState } from "react";

import { buttonStyle } from "../../styles";
import { useAnimalState } from "../../State/Context";
import { setLocation } from "../../State/Actions";

import GpsButton from "./GpsButton";

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

const LocationInput: FunctionComponent = () => {
  const [showFindMe, setShowFindMe] = useState(true);

  const [state, dispatch] = useAnimalState();
  const { location } = state;

  const swapInputs = () => {
    setShowFindMe(!showFindMe);
    dispatch(setLocation(""));
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
              onChange={(e) => dispatch(setLocation(e.target.value))}
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
          <GpsButton />
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
