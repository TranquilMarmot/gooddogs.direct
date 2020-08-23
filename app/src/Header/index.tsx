/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";

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
}

const Header: FunctionComponent<HeaderProps> = ({ doSearch }) => {
  return (
    <div css={containerStyle}>
      <SearchForm doSearch={doSearch} />
      <div css={headerContainerStyle}>
        <Logo />
        <About />
      </div>
    </div>
  );
};

export default Header;
