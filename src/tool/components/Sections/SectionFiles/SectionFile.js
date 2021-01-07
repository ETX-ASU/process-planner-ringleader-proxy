import React, { useCallback, useState } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { downloadFile, getPureFilename } from "../../../utils/storage";
import styles from "./SectionFiles.module.scss";

export const SectionFile = ({ file, canEdit, onFileRemove }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleFileRemove = useCallback(
    (event) => {
      event.stopPropagation();

      onFileRemove(file.fileKey);
    },
    [file, onFileRemove]
  );

  const handleFileDownload = useCallback(async () => {
    setIsDownloading(true);
    await downloadFile(file.fileKey, file.fileName);
    setIsDownloading(false);
  }, [file.fileKey, file.fileName]);

  return (
    <div
      className={clsx(
        styles.sectionFile,
        isDownloading && styles.isDownloading
      )}
      key={file.fileKey}
      onClick={handleFileDownload}
    >
      <span>{getPureFilename(file.fileName)}</span>
      <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
      {canEdit && <FontAwesomeIcon icon={faTimes} onClick={handleFileRemove} />}
    </div>
  );
};
