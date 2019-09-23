import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

class ConfirmModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    buttonType: PropTypes.string,
    modal: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    onConfirmPress: PropTypes.func.isRequired,
  };
  render() {
    const {
      title,
      message,
      confirmText,
      cancelText,
      buttonType,
      onConfirmPress,
      modal,
      toggle,
    } = this.props;
    return (
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>{title || "Confirm"}</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
          {cancelText || "Cancel"}
          </Button>{" "}
          <Button
            color={buttonType || "danger"}
            onClick={() => {
              toggle();
              onConfirmPress();
            }}
          >
            {confirmText || "OK"}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ConfirmModal;
