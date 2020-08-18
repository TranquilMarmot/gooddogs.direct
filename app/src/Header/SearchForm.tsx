/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, Dispatch, SetStateAction } from "react";

import Sparkles from "../Sparkles";
import { buttonStyle } from "../styles";
import LocationInput from "./LocationInput";

interface SearchFormProps {
  doSearch: () => void;

  location: string;
  setLocation: Dispatch<SetStateAction<string>>;

  apartmentFriendly: boolean;
  setApartmentFriendly: Dispatch<SetStateAction<boolean>>;
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

const SearchForm: FunctionComponent<SearchFormProps> = ({
  doSearch,
  location,
  setLocation,
  apartmentFriendly,
  setApartmentFriendly,
}) => {
  return (
    <form
      css={formStyle}
      onSubmit={(e) => {
        e.preventDefault();
        doSearch();
      }}
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
