/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";
import { FunctionComponent, PropsWithChildren, Fragment } from "react";

import ReactModal from "react-modal";
import { buttonStyle } from "./styles";

const modalStyles: ReactModal.Styles = {
  content: {
    background: "#bcd0c4",
    maxWidth: "1500px",
    marginLeft: "auto",
    marginRight: "auto",
    height: "700px",
    width: "75%",
  },
  overlay: {
    backgroundColor: "rgba(104, 104, 104, 0.75)",
    overflow: "auto",
  },
};

const modalGlobalStyles = css`
  .ReactModal__Content {
    @media only screen and (max-width: 430px) {
      top: 0 !important;
      left: 0 !important;
      width: 90% !important;
      height: 100% !important;
    }
  }
`;
const modalContentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  font-family: "Alata", sans-serif;
`;

const modalFooterStyle = css`
  display: flex;
  justify-content: flex-end;
`;

const closeButtonStyle = css`
  ${buttonStyle}

  width: 115px;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FunctionComponent<PropsWithChildren<ModalProps>> = ({
  onClose,
  isOpen,
  children,
}) => {
  return (
    <Fragment>
      <Global styles={modalGlobalStyles} />
      <ReactModal
        style={modalStyles}
        isOpen={isOpen}
        appElement={document.getElementById("app-container")!}
        shouldCloseOnEsc
      >
        <div css={modalContentStyle}>
          <div>{children}</div>

          <div css={modalFooterStyle}>
            <button css={closeButtonStyle} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </ReactModal>
    </Fragment>
  );
};

export default Modal;
