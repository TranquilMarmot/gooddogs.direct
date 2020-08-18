/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, Dispatch, SetStateAction } from "react";

import SearchForm from "./SearchForm";
import Sparkles from "../Sparkles";

const headerContainerStyle = css`
  margin-right: 15px;
`;

const headerStyle = css`
  font-family: "Fredoka One", cursive;
  text-align: right;
  font-size: 70px;

  margin: 0;
  padding-top: 10px;

  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;

  background: linear-gradient(135deg, #b8a3ce 0%, #7db9e8 100%);
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const subHeaderStyle = css`
  font-family: "Faster One", cursive;
  text-align: right;
  font-size: 50px;

  margin: 0;
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
        <Sparkles>
          <h1 css={headerStyle}>Good Dogs</h1>
        </Sparkles>
        <h2 css={subHeaderStyle}>Direct</h2>
      </div>
    </div>
  );
};

export default Header;
