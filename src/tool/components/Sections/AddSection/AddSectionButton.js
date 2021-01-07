import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./AddSectionButton.module.scss";

export const AddSectionButton = ({ onClick }) => (
  <div className={styles.button} onClick={onClick}>
    <FontAwesomeIcon icon={faPlus} />
    <span>Add Section</span>
  </div>
);

AddSectionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
