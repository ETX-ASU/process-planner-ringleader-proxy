import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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

  const plainProgress = progress * 100;
  const fixedProgress = plainProgress.toFixed(2);
  const progressValue =
    // eslint-disable-next-line eqeqeq
    plainProgress == fixedProgress ? plainProgress : fixedProgress;
  const progressPercentage = progressValue + "%";

  return (
    <>
      <div className={styles.infoButton} onClick={handleButtonClick}>
        See assignment details
      </div>
      {isModalOpen && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={handleModalClick}>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={closeModal}
              className={styles.closeButton}
            />
            <div className={styles.title}>{title}</div>
            <div className={styles.meta}>
              <div className={styles.metaSection}>
                <h3>Progress</h3>
                <div className={styles.progress}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${progressPercentage}` }}
                  />
                  <span>{progressPercentage}</span>
                </div>
              </div>
              <div className={styles.metaSection}></div>
            </div>
            <div className={styles.description}>
              <h3>Assignment summary:</h3>
              <p>
                {description ||
                  "The instructor didn't provide any additional information"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Info.propTypes = tabInfoProps;
