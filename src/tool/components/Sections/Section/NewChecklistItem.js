import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import styles from "./Section.module.scss";

export const NewChecklistItem = ({ onCreate }) => {
  const [value, setValue] = useState("");

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const handleItemCreate = useCallback(() => {
    if (value !== "") {
      onCreate({
        id: uuid(),
        done: false,
        label: value,
      });
      setValue("");
    }
  }, [onCreate, value]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleItemCreate();
        event.target.blur();
      }
    },
    [handleItemCreate]
  );

  return (
    <li className={styles.newItem}>
      <label>
        <input type="checkbox" disabled />
        <input
          type="text"
          placeholder="Enter new checklist item..."
          value={value}
          onChange={handleChange}
          onBlur={handleItemCreate}
          onKeyPress={handleKeyPress}
        />
      </label>
    </li>
  );
};

NewChecklistItem.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
