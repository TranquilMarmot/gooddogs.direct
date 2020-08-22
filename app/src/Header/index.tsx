/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, Dispatch, SetStateAction } from "react";

import SearchForm from "./SearchForm";
import About from "./About";
import Logo from "./Logo";

const headerContainerStyle = css`
  margin-right: 15px;

  @media only screen and (max-width: 500px) {
    margin-right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const containerStyle = css`
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  @media only screen and (max-width: 500px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

interface HeaderProps {
  doSearch: () => void;

  location: string;
  setLocation: Dispatch<SetStateAction<string>>;

  apartmentFriendly: boolean;
  setApartmentFriendly: Dispatch<SetStateAction<boolean>>;
}

const Header: FunctionComponent<HeaderProps> = ({
  doSearch,
  location,
  setLocation,
  apartmentFriendly,
  setApartmentFriendly,
}) => {
  return (
    <div css={containerStyle}>
      <SearchForm
        doSearch={doSearch}
        location={location}
        setLocation={setLocation}
        apartmentFriendly={apartmentFriendly}
        setApartmentFriendly={setApartmentFriendly}
      />
      <div css={headerContainerStyle}>
        <Logo />
        <About />
      </div>
    </div>
  );
};

export default Header;
