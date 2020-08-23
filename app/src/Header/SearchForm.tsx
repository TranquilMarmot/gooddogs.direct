/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";

import Sparkles from "../Sparkles";
import { buttonStyle } from "../styles";
import LocationInput from "./LocationInput";
import AboutApartmentFriendly from "./AboutApartmentFriendly";
import { useAnimalState } from "../State/Context";
import { setApartmentFriendly } from "../State/Actions";

interface SearchFormProps {
  /** Function to call to actually trigger the search */
  doSearch: () => void;
}

const formStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 175px;
  width: 400px;

  margin-left: 10px;

  @media only screen and (max-width: 500px) {
    margin-left: 0;
    width: 275px;
  }
`;

const submitButtonStyle = css`
  ${buttonStyle}
  width: 100%;
`;

const SearchForm: FunctionComponent<SearchFormProps> = ({ doSearch }) => {
  const [state, dispatch] = useAnimalState();
  const { location, apartmentFriendly } = state;

  return (
    <form
      css={formStyle}
      onSubmit={(e) => {
        e.preventDefault();
        doSearch();
      }}
    >
      <LocationInput />

      <div>
        <input
          type="checkbox"
          id="apartment-friendly-checkbox"
          checked={apartmentFriendly}
          onChange={(e) => dispatch(setApartmentFriendly(e.target.checked))}
        />
        <label htmlFor="apartment-friendly-checkbox">
          Only show apartment friendly dogs
        </label>
        <AboutApartmentFriendly />
      </div>

      <Sparkles active={false && location.trim().length > 0}>
        <button css={submitButtonStyle} type="submit">
          Find Good Dogs
        </button>
      </Sparkles>
    </form>
  );
};

export default SearchForm;
