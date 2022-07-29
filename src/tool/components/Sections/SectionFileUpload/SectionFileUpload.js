import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import { Storage } from "aws-amplify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { reportError } from "../../../../developer/DevUtils";
import { useProcessPlanner } from "../../../hooks/useProcessPlanner";
import { MAX_UPLOAD_FILE_SIZE } from "../../../constants";
import styles from "./SectionFileUpload.module.scss"; 

export const SectionFileUpload = ({ sectionId }) => {
  const [isUploading, setIsUploading] = useState(false);

  const { addFile } = useProcessPlanner();

  const handleFileUpload = useCallback(
    async (event) => {
      if (isUploading) {
        return;
      }

      const field = event.target;
      const file = field.files[0];

      if (file.size > MAX_UPLOAD_FILE_SIZE) {
        window.alert("File size is too big - maximum allowed size is 5MB");
        return;
      }

      if (file) {
        setIsUploading(true);

        const { name, type: contentType } = file;
        const randomName = `${uuid()}-${name}`;

        try {
          const { key } = await Storage.put(randomName, file, { contentType });

          field.value = "";

          addFile(sectionId, key, name);
          setIsUploading(false);
        } catch (error) {
          reportError(
            error,
            `We're sorry. There was a problem uploading your file.`
          );
        }
      }
    },
    [addFile, isUploading, sectionId]
  );

  return (
    <label className={styles.button}>
      {isUploading ? (
        <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
      ) : (
        <React.Fragment>
          <FontAwesomeIcon icon={faPaperclip} />
          <span>Attach file</span>
          <input type="file" disabled={isUploading} onChange={handleFileUpload} />
        </React.Fragment>
      )}
    </label>
  );
};

SectionFileUpload.propTypes = {
  sectionId: PropTypes.string.isRequired,
};
