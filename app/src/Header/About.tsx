/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, useState } from "react";

import Modal from "../Modal";
import ImageSlideshow from "../ImageSlideshow";

import { ReactComponent as BowlIcon } from "../images/bowl.svg";
import { buttonStyle } from "../styles";
import Logo from "./Logo";

import Phil1 from "../images/phil1.jpg";
import Phil2 from "../images/phil2.jpg";
import Phil3 from "../images/phil3.jpg";
import Phil4 from "../images/phil4.jpg";
import Phil5 from "../images/phil5.jpg";
import Phil6 from "../images/phil6.jpg";

const aboutContainerStyle = css`
  float: right;
  padding-top: 15px;
`;

const aboutButtonStyle = css`
  ${buttonStyle}

  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px 15px;
`;

const bowlIconStyle = css`
  width: 40px;
  height: 40px;
  margin-left: 5px;
`;

const logoStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const slideshowImageStyle = css`
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const infoStyle = css`
  display: flex;
  justify-content: center;

  padding-top: 35px;
`;

const philContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 25px;
`;

const dedicationStyle = css`
  font-family: "Lobster", cursive;

  font-size: 40px;
  margin-top: 10px;
`;

const yearsStyle = css`
  font-family: "Lobster", cursive;
`;

const About: FunctionComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div css={aboutContainerStyle}>
      <button css={aboutButtonStyle} onClick={() => setModalOpen(true)}>
        About <BowlIcon css={bowlIconStyle} />
      </button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div css={logoStyle}>
          <Logo rightAlign={false} />
        </div>
        <div css={infoStyle}>
          <div css={philContainerStyle}>
            <ImageSlideshow
              imageStyles={slideshowImageStyle}
              secondsBetweenImages={5}
              imageWidthPx={250}
              imageHeightPx={250}
            >
              {Phil1}
              {Phil2}
              {Phil3}
              {Phil4}
              {Phil5}
              {Phil6}
            </ImageSlideshow>
            <div css={dedicationStyle}>Dedicated to Phil</div>
            <div css={yearsStyle}>2004 - 2019</div>
          </div>

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
                for an actually usable reverse geocoding API to get ZIP codes
                from GPS coordinates
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default About;
