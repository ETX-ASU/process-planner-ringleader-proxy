import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import classNames from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./Section.module.scss";
import ConfirmationModal from "../../../../app/components/ConfirmationModal";
import { noop } from "../../../utils/core";

export const SectionTitle = ({ id, title, canEdit, onChange, onDelete }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        onChange(event.target.value);
        event.target.blur();
      }
    },
    [onChange]
  );

  const handleEditToggle = useCallback(
    () => setIsEdited((isEdited) => !isEdited),
    []
  );

  const handleDeleteClick = useCallback(() => setShowConfirmation(true), []);

  const handleHideConfirmation = useCallback(
    () => setShowConfirmation(false),
    []
  );

  return (
    <>
      {showConfirmation && (
        <ConfirmationModal
          isStatic
          onHide={handleHideConfirmation}
          title={"Delete Section"}
          buttons={[
            {
              name: "Cancel",
              variant: "secondary",
              onClick: handleHideConfirmation,
            },
            {
              name: "Delete",
              onClick: () => onDelete(id),
            },
          ]}
        >
          <p>Are you sure you want to delete this section and its contents?</p>
          <p>This operation cannot be undone.</p>
        </ConfirmationModal>
      )}
      <div
        className={classNames(styles.sectionTitle, isEdited && styles.isEdited)}
      >
        {isEdited ? (
          <input
            autoFocus
            type="text"
            placeholder="Enter section title..."
            value={title}
            onChange={handleChange}
            onBlur={handleEditToggle}
            onKeyPress={handleKeyPress}
            onFocus={(event) => event.target.select()}
          />
        ) : (
          <>
            <span onDoubleClick={canEdit ? handleEditToggle : noop}>
              {title}
            </span>
            {canEdit && (
              <div className={styles.actions}>
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  onClick={handleEditToggle}
                  className={styles.editIcon}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={handleDeleteClick}
                  className={styles.deleteIcon}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

SectionTitle.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  canEdit: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
