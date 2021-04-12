/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, useState, useMemo } from "react";
import GitInfo from "react-git-info/macro";

import Modal from "../../Modal";

import { ReactComponent as BowlIcon } from "../../images/bowl.svg";
import { buttonStyle } from "../../styles";
import Logo from "../Logo";

import Phil from "./Phil";
import Info from "./Info";

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

const infoStyle = css`
  display: flex;
  justify-content: center;

  padding-top: 35px;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const versionStyle = css`
  font-size: 11px;
  color: #999;
`;

const About: FunctionComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const gitInfo = useMemo(GitInfo, []);

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
          <Phil />
          <Info />
        </div>
        <span css={versionStyle}>Version {gitInfo.commit.shortHash}</span>
      </Modal>
    </div>
  );
};

export default About;
