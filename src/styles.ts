import { css } from "@emotion/core";

export const buttonStyle = css`
  padding: 10px 15px;
  font-weight: 800;
  border: 1px solid black;
  border-radius: 5px;

  background: linear-gradient(135deg, #b8a3ce 0%, #7db9e8 100%);

  &:hover {
    cursor: pointer;
  }
`;
