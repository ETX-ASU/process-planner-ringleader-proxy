import React, { useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import { ACCESS_LEVELS } from "../../constants";
import styles from "./AccessLevelHelp.module.scss";

export const YourAccessLevel = ({ level }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleShow = useCallback(() => setIsVisible(true), []);
  const handleHide = useCallback(() => setIsVisible(false), []);

  return (
    <div className={styles.yourAccessLevel}>
      <div className={styles.link} onClick={handleShow}>
        See your access level
      </div>
      <Modal
        animation={false}
        centered
        className={styles.dialog}
        onHide={handleHide}
        show={isVisible}
      >
        <Modal.Header closeButton>
          <Modal.Title>Student Access Level</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You can:</p>
          <ul>
            <li>Add text to faculty-made sections</li>
            <li>Add sections to faculty-made tabs</li>
            {level !== ACCESS_LEVELS.readonly && (
              <li>Make and edit new tabs</li>
            )}
            {level === ACCESS_LEVELS.full && (
              <li>Make new tabs and edit all tabs</li>
            )}
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};
