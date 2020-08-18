/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, useState, FormEvent } from "react";

import Sparkles from "../Sparkles";
import { buttonStyle } from "../styles";
import LocationInput from "./LocationInput";

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

const SearchForm: FunctionComponent<SearchFormProps> = ({ doSearch }) => {
  const [location, setLocation] = useState("");
  const [apartmentFriendly, setApartmentFriendly] = useState(true);

  return (
    <form
      css={formStyle}
      onSubmit={(e) => onFormSubmit(e, doSearch, location, apartmentFriendly)}
    >
      <LocationInput location={location} setLocation={setLocation} />

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
