import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { calculateWordCount } from "../../../ToolUtils";
import { USER_TYPE } from "../../../constants";
import styles from "./Section.module.scss";

export const TextSection = ({
  canEdit,
  minWordCount,
  value,
  onChange,
  userType,
  placeholder = "Enter text here",
}) => {
  const [wordCount, setWordCount] = useState(
    value.length > 0 ? calculateWordCount(value) : 0
  );

  const handleChange = useCallback(
    (event) => {
      const text = event.target.value;
      const wordCount = calculateWordCount(text);

      setWordCount(wordCount);
      onChange(event);
    },
    [onChange]
  );

  return canEdit ? (
    <>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {userType === USER_TYPE.student && canEdit && (
        <p className={styles.wordCount}>
          <span>Words: {wordCount}</span>
          {minWordCount ? <span>Required words: {minWordCount}</span> : null}
        </p>
      )}
    </>
  ) : (
    <div className={styles.textSection}>{value}</div>
  );
};

TextSection.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
