/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, useState, Fragment } from "react";

import Modal from "../Modal";
import { ReactComponent as QuestionIcon } from "../images/question.svg";

const questionIconStyle = css`
  width: 15px;
  height: 15px;
`;

const buttonStyle = css`
  background: none;
  border: none;

  & :hover {
    cursor: pointer;
  }
`;

const AboutApartmentFriendly: FunctionComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Fragment>
      <button
        type="button"
        title="About apartment friendly dogs"
        css={buttonStyle}
        onClick={() => setModalOpen(true)}
      >
        <QuestionIcon css={questionIconStyle} />
      </button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <strong>A Note:</strong>
        <p>
          We do <em>not</em> think that any dog breed is inherently dangerous or
          bad in any way.
        </p>
        <p>
          <u>
            <strong>They are all good dogs.</strong>
          </u>
        </p>
        <p>
          We do, however, understand that there is a common list of dogs that
          apartments do not allow.
        </p>
        <p>Checking this box will filter out the following breeds:</p>
        <ul>
          <li>Akita</li>
          <li>Alaskan Malamute</li>
          <li>Cane Corso</li>
          <li>Pit Bull</li>
          <li>Rottweiler</li>
          <li>German Shepherd</li>
          <li>Great Dane</li>
          <li>Staffordshire Bull Terrier</li>
        </ul>
        <p>
          Pets with the following in their descriptions will also be filtered
          out:
        </p>
        <ul>
          <li>fenced yard</li>
          <li>no apartment</li>
          <li>not suitable for an apartment</li>
          <li>bonded pair</li>
          <li>requires another dog</li>
        </ul>
      </Modal>
    </Fragment>
  );
};
export default AboutApartmentFriendly;
