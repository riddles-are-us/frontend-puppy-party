// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from "react";
import {
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import closeIcon from "../assets/main/modal_close.png";
import { useAppSelector } from "../app/hooks";
import "./style.scss";
import React from "react";
import { selectL1Account } from "../data/accountSlice";
export interface ModalCommonProps {
  btnLabel: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  childrenClass: string;
  valid: boolean;
  handleConfirm?: () => void;
  handleShow?: () => void;
  handleClose?: () => void;
  message: string;
  status: ModalStatus;
  confirmLabel?: React.ReactNode;
}

export enum ModalStatus {
  PreConfirm,
  Confirmed,
  PostConfirm,
  Error,
}

export function ModalCommon(props: ModalCommonProps) {
  const [show, setShow] = useState(false);
  const account = useAppSelector(selectL1Account);
  const handleClose = () => {
    if (props.handleClose) {
      props.handleClose();
    }
    setShow(false);
  };
  const handleShow = () => {
    if (props.handleShow) {
      props.handleShow();
    }
    setShow(true);
  };

  const Message = () => {
    if (account?.address === undefined) {
      return (
        <div>Please connect your wallet before submitting any requests!</div>
      );
    }
    return <div className="modal-error-msg">{props.message}</div>;
  };

  return (
    <>
      <div className="modal-btn" onClick={handleShow}>
        {props.btnLabel}
      </div>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backgroundColor="#ebdbb2"
        centered
        dialogClassName="modal-90w"
        role="dialog"
      >
        <Modal.Header>
          <div className="left-item">{props.title}</div>
          <a>
          <img src={closeIcon} className="pull-right" onClick={handleClose}/>
          </a>
        </Modal.Header>
        <Modal.Body className="show-grid">{props.children}</Modal.Body>
        <Modal.Footer>
          <Message></Message>

          {props.handleConfirm && props.status === ModalStatus.PreConfirm && (
            <Button
              variant="confirm"
              disabled={props.valid !== true || account?.address === undefined}
              onClick={props.handleConfirm}
            >
              {props.confirmLabel}
            </Button>
          )}
          <WaitingForResponseBar></WaitingForResponseBar>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function WaitingForResponseBar() {
  const wfr = false;
  if (wfr) {
    return <Spinner animation="border" variant="light"></Spinner>;
  } else {
    return <></>;
  }
}
