import React, { useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "clsx";
import { Form } from "react-bootstrap";
import { SECTION_TYPE } from "../../../constants";
import styles from "./SectionType.module.scss";

export const SectionType = ({ type, id, onChange, readOnly }) => {
  const handleTypeChange = useCallback(
    () =>
      onChange(
        type === SECTION_TYPE.text ? SECTION_TYPE.checklist : SECTION_TYPE.text
      ),
    [onChange, type]
  );

  return (
    <div
      className={classNames(
        styles.sectionType,
        readOnly && styles.readOnly,
        styles[type]
      )}
    >
      <span>Section Type:</span>
      <span
        className={classNames(
          styles.label,
          styles.text,
          type === SECTION_TYPE.text && styles.selected
        )}
      >
        Text
      </span>
      <Form.Switch
        id={`section-type-${id}`}
        className={styles.switch}
        checked={type === SECTION_TYPE.checklist}
        onChange={handleTypeChange}
      />
      <span
        className={classNames(
          styles.label,
          styles.checklist,
          type === SECTION_TYPE.checklist && styles.selected
        )}
      >
        Checklist
      </span>
    </div>
  );
};

SectionType.propTypes = {
  type: PropTypes.oneOf([SECTION_TYPE.text, SECTION_TYPE.checklist]),
  id: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};
