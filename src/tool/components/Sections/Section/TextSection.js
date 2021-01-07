import React from "react";
import PropTypes from "prop-types";
import styles from "./Section.module.scss";

export const TextSection = ({ canEdit, value, onChange }) =>
  canEdit ? (
    <textarea value={value} onChange={onChange} placeholder="Enter text here" />
  ) : (
    <div className={styles.textSection}>{value}</div>
  );

TextSection.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
