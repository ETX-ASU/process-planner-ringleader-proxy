import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import classNames from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./Section.module.scss";

export const ChecklistItem = ({
  id,
  label,
  done,
  createdByTeacher,
  canEdit,
  onChange,
  onDelete,
}) => {
  const [isEdited, setIsEdited] = useState(false);

  const handleEditToggle = useCallback((event) => {
    setIsEdited((isEdited) => !isEdited);
  }, []);

  const handleDeleteClick = useCallback(
    (event) => {
      onDelete(id);
    },
    [id, onDelete]
  );

  const handleLabelChange = useCallback(
    (event) => {
      const newLabel = event.target.value;

      onChange({
        id,
        label: newLabel,
        done,
      });
    },
    [done, id, onChange]
  );

  const handleDoneChange = useCallback(() => {
    onChange({
      id,
      label,
      done: !done,
    });
  }, [done, id, label, onChange]);

  const handleEditFinish = useCallback(() => setIsEdited(false), []);

  const handleKeyPress = useCallback((event) => {
    if (event.key === "Enter") {
      setIsEdited(false);
    }
  }, []);

  return (
    <li className={classNames(isEdited && styles.isEdited)}>
      <label>
        <input
          type="checkbox"
          checked={done}
          disabled={!canEdit}
          value={label}
          onChange={handleDoneChange}
        />
        {isEdited ? (
          <input
            type="text"
            value={label}
            autoFocus
            onKeyPress={handleKeyPress}
            onChange={handleLabelChange}
            onBlur={handleEditFinish}
          />
        ) : (
          <span>{label}</span>
        )}
      </label>
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
    </li>
  );
};

ChecklistItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  done: PropTypes.bool,
  canEdit: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
