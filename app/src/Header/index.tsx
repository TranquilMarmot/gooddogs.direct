/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, Dispatch, SetStateAction } from "react";

import SearchForm from "./SearchForm";
import About from "./About";
import Logo from "./Logo";

const headerContainerStyle = css`
  margin-right: 15px;
`;

const containerStyle = css`
  display: flex;
  justify-content: space-between;
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
