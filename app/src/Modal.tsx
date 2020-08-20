/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent, PropsWithChildren } from "react";

import ReactModal from "react-modal";
import { buttonStyle } from "./styles";

const modalStyles: ReactModal.Styles = {
  content: {
    background: "#bcd0c4",
    maxWidth: "1500px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  overlay: {
    backgroundColor: "rgba(104, 104, 104, 0.75)",
  },
};

const modalContentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
    <ReactModal style={modalStyles} isOpen={isOpen}>
      <div css={modalContentStyle}>
        <div>{children}</div>

        <div css={modalFooterStyle}>
          <button css={closeButtonStyle} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal;
