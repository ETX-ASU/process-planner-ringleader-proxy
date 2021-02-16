import React from "react";
import { AccessLevelHelp } from "./AccessLevelHelp";
import styles from "./AccessLevelHelp.module.scss";

export const YourAccessLevel = ({ level }) => (
  <div className={styles.yourAccessLevel}>
    Your access level is: <strong>{level}</strong>
    <AccessLevelHelp />
  </div>
);