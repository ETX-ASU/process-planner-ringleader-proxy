import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faTimes } from "@fortawesome/free-solid-svg-icons";
import { calculateTimeDiff } from "../../utils/time";
import { tabInfoProps } from "../../types/info";
import styles from "./Info.module.scss";

export const Info = ({ title, progress, dueDate, description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = useCallback(
    () => setIsModalOpen((isOpen) => !isOpen),
    []
  );

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleModalClick = useCallback((event) => event.stopPropagation(), []);

  return (
    <>
      <div className={styles.infoButton} onClick={handleButtonClick}>
        <FontAwesomeIcon icon={faQuestion} />
      </div>
      {isModalOpen && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={handleModalClick}>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={closeModal}
              className={styles.closeButton}
            />
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.meta}>
              <div className={styles.metaSection}>
                <h3>Progress</h3>
                <div className={styles.progress}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>
              <div className={styles.metaSection}>
                {dueDate && (
                  <>
                    <h3>Due In</h3>
                    <p>{calculateTimeDiff(Date.now(), dueDate)}</p>
                  </>
                )}
              </div>
            </div>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
      )}
    </>
  );
};

Info.propTypes = tabInfoProps;
