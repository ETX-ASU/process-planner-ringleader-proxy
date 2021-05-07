import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import classNames from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { tabPermissionsProps } from "../../types/tabs";
import ConfirmationModal from "../../../app/components/ConfirmationModal";
import styles from "./Tabs.module.scss";

export const Tab = ({
  id,
  permissions,
  className,
  title,
  onClick,
  onDeleteClick,
  onEditTabName,
  onReorder,
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      onClick(event);
    },
    [onClick]
  );

  const handleDeleteClick = useCallback((event) => {
    event.stopPropagation();
    setShowConfirmation(true);
  }, []);

  const handleHideConfirmation = useCallback(
    () => setShowConfirmation(false),
    []
  );

  const handleEditToggle = useCallback((event) => {
    event.stopPropagation();
    setIsEdited((isEdited) => !isEdited);
  }, []);

  const handleInputClick = useCallback((event) => {
    event.stopPropagation();
  }, []);

  const handleInputKeyPress = useCallback((event) => {
    if (event.key === "Enter") {
      setIsEdited(false);
    }
  }, []);

  const handleInputBlur = useCallback(() => setIsEdited(false), []);

  const handleInputChange = useCallback(
    (event) => {
      event.stopPropagation();
      onEditTabName(event.target.value);
    },
    [onEditTabName]
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragEnter = useCallback((event) => event.preventDefault(), []);

  const handleDragLeave = useCallback(() => setIsDragOver(false), []);

  const handleDragStart = useCallback(
    (event) => {
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData("text/plain", id);
    },
    [id]
  );

  const handleDrop = useCallback(
    (event) => {
      event.stopPropagation();
      const draggedId = event.dataTransfer.getData("text/plain");
      setIsDragOver(false);
      if (draggedId !== id) {
        onReorder(draggedId, id);
      }
      return false;
    },
    [id, onReorder]
  );

  const isDraggable = !isEdited && permissions.canEditTab;

  return (
    <>
      {showConfirmation && (
        <ConfirmationModal
          isStatic
          onHide={handleHideConfirmation}
          title={"Delete Tab"}
          buttons={[
            { name: "Cancel", onClick: handleHideConfirmation },
            {
              name: "Delete",
              onClick: onDeleteClick,
            },
          ]}
        >
          <p>Are you sure you want to delete this tab and its contents?</p>
          <p>This operation cannot be undone.</p>
        </ConfirmationModal>
      )}
      <div
        className={classNames(
          styles.tabItem,
          isEdited && styles.isEdited,
          isDraggable && styles.isDraggable,
          isDraggable && isDragOver && styles.isDragOver,
          className
        )}
        onClick={handleClick}
        draggable={isDraggable}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
      >
        {isEdited ? (
          <input
            autoFocus
            type="text"
            value={title}
            maxLength={50}
            onBlur={handleInputBlur}
            onChange={handleInputChange}
            onClick={handleInputClick}
            onKeyPress={handleInputKeyPress}
            onFocus={(event) => event.target.select()}
          />
        ) : (
          <>
            <span>{title}</span>
            {permissions.canEditTab && (
              <FontAwesomeIcon
                icon={faPencilAlt}
                onClick={handleEditToggle}
                className={styles.editIcon}
              />
            )}
            {permissions.canDelete && (
              <FontAwesomeIcon
                icon={faTimes}
                onClick={handleDeleteClick}
                className={styles.deleteIcon}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  permissions: PropTypes.shape(tabPermissionsProps),
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onEditTabName: PropTypes.func,
  onReorder: PropTypes.func,
};
