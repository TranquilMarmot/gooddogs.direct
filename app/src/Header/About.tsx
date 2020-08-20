/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, useState } from "react";

import { ReactComponent as BowlIcon } from "../images/bowl.svg";
import { buttonStyle } from "../styles";
import Logo from "./Logo";
import Modal from "../Modal";

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
      </Modal>
    </div>
  );
};

export default About;
