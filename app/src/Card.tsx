/** @jsx jsx */
import { jsx, css, SerializedStyles } from "@emotion/core";
import {
  FunctionComponent,
  useState,
  PropsWithChildren,
  HTMLAttributes,
} from "react";

import { getRandomRotation } from "./util";

const baseContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 275px;

  margin: 50px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;

  text-decoration: none;
  color: #111;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  border-radius: 15px;

  transition: box-shadow 0.5s, transform 1s;

  &:hover {
    box-shadow: 0 14px 18px 0 rgba(0, 0, 0, 0.2),
      0 16px 40px 0 rgba(0, 0, 0, 0.19);
  }

  @media only screen and (max-width: 500px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const nameStyle = css`
  text-align: center;
  font-family: "Pangolin", cursive;

  width: 100%;

  border-bottom: 1px solid grey;
  padding-bottom: 10px;
`;

const headerLinkStyle = css`
  color: #111;
  text-decoration: none;
`;

interface CardProps {
  /** Title to show at the top of the card */
  title: string;

  /** URL to link to when clicking the card (leave blank for an un-clickable card) */
  url?: string;

  /** Optional styles to add to container */
  containerStyle?: SerializedStyles;
}

type Props = PropsWithChildren<CardProps> & HTMLAttributes<HTMLDivElement>;

const Card: FunctionComponent<Props> = (props) => {
  const { containerStyle, url, title, children, ...restOfProps } = props;

  // we store the rotation in the state so that if this card gets re-rendered it
  // doesn't suddenly change its rotation
  const [containerRotateDeg] = useState(getRandomRotation(3, 7));
  const [containerHoverRotateDeg] = useState(
    containerRotateDeg - containerRotateDeg / 2.5
  );

  const containerRotateStyle = css`
    ${baseContainerStyle}
    ${containerStyle}
    transform: rotate(${containerRotateDeg}deg);

    &:hover {
        transform: rotate(${containerHoverRotateDeg}deg);
    }
  `;

  return (
    <div className="dog-card" css={containerRotateStyle} {...restOfProps}>
      <h2 css={nameStyle}>
        <a
          css={headerLinkStyle}
          href={url}
          target="blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
      </h2>
      {children}
    </div>
  );
};

export default Card;
