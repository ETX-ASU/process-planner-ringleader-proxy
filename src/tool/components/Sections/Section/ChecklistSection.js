import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { ChecklistItem } from "./ChecklistItem";
import { NewChecklistItem } from "./NewChecklistItem";
import { checklistItem } from "../../../types/tabs";
import styles from "./Section.module.scss";

export const ChecklistSection = ({ canEdit, items, onChange }) => {
  const handleItemEdit = useCallback(
    (changedItem) => {
      const newItems = items.reduce((acc, item) => {
        if (item.id === changedItem.id) {
          acc.push(changedItem);
        } else {
          acc.push(item);
        }

        return acc;
      }, []);

      onChange(newItems);
    },
    [items, onChange]
  );

  const handleItemCreate = useCallback(
    (item) => {
      const newItems = items ? [...items, item] : [item];
      onChange(newItems);
    },
    [items, onChange]
  );

  const handleItemDelete = useCallback(
    (id) => {
      const newItems = items.filter((item) => item.id !== id);
      onChange(newItems);
    },
    [items, onChange]
  );

  return (
    <ul className={styles.checklist}>
      {items.map((item, index) => {
        return (
          <ChecklistItem
            key={index}
            {...item}
            canEdit={canEdit}
            onChange={handleItemEdit}
            onDelete={handleItemDelete}
          />
        );
      })}
      {canEdit && <NewChecklistItem onCreate={handleItemCreate} />}
    </ul>
  );
};

ChecklistSection.propTypes = {
  canEdit: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape(checklistItem)),
  onChange: PropTypes.func,
};