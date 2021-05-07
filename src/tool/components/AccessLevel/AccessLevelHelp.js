import React, { useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./AccessLevelHelp.module.scss";

export const AccessLevelHelp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleShow = useCallback(() => setIsVisible(true), []);
  const handleHide = useCallback(() => setIsVisible(false), []);

  return (
    <>
      <div className={styles.link} onClick={handleShow}>
        What's this?
      </div>
      <Modal
        animation={false}
        centered
        className={styles.dialog}
        onHide={handleHide}
        show={isVisible}
      >
        <Modal.Header closeButton>
          <Modal.Title>Access levels</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Read Only</strong>: Students may only add text to checklists
            and text boxes
          </p>
          <p>
            <strong>Partial</strong>: Students can make and edit their own tabs,
            but faculty-made tabs are "Read Only"
          </p>
          <p>
            <strong>Full</strong>: Students may edit all tabs
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};
