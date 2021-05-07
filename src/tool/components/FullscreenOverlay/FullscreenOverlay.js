import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "./FullscreenOverlay.module.scss";

export const FullscreenOverlay = () => (
  <div className={styles.FullscreenOverlay}>
    <Spinner animation="border" role="status" variant="light" />
  </div>
)
