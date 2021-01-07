import React from "react";
import { SectionFile } from "./SectionFile";
import styles from "./SectionFiles.module.scss";

export const SectionFiles = ({ files, canEdit, onFileRemove }) => (
  <div className={styles.sectionFilesWrapper}>
    {files.map((file) => (
      <SectionFile
        key={file.fileKey}
        file={file}
        canEdit={canEdit}
        onFileRemove={onFileRemove}
      />
    ))}
  </div>
);
