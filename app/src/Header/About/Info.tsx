/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";

import { ReactComponent as CoffeeIcon } from "../../images/dog_coffee.svg";

const coffeeStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
  margin-top: 25px;
`;

const Info: FunctionComponent = () => {
  return (
    <div>
      <p>
        Made with{" "}
        <span role="img" aria-label="dogs">
          🐕
        </span>{" "}
        by Nate Moore
      </p>
      <p>
        <a
          href="https://nate.moore.codes/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://nate.moore.codes
        </a>
      </p>
      <p>
        <a href="mailto:nate@moore.codes">nate@moore.codes</a>
      </p>
      <p>
        <strong>
          <span role="img" aria-label="spark;es">
            ✨
          </span>{" "}
          Special thanks{" "}
          <span role="img" aria-label="spark;es">
            ✨
          </span>
        </strong>
      </p>
      <ul>
        <li>
          <a
            href="https://thenounproject.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Noun Project
          </a>{" "}
          for all of the icons on this site
        </li>
        <li>
          <a
            href="https://www.petfinder.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            PetFinder
          </a>{" "}
          for having a free, easy-to-use API
        </li>
        <li>
          <a
            href="https://www.adoptapet.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Adopt-a-pet
          </a>{" "}
          for having a GraphQL API that was easy to reverse engineer
        </li>
        <li>
          <a
            href="https://nominatim.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenStreetMap Nominatim
          </a>{" "}
          for an actually usable reverse geocoding API
        </li>
      </ul>
      <a
        css={coffeeStyle}
        href="https://ko-fi.com/tranquilmarmot"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CoffeeIcon />
        Like this site? Buy me a coffee!
      </a>
    </div>
  );
};

export default Info;
