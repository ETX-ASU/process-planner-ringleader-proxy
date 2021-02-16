import React, { useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "clsx";
import { SECTION_TYPE, USER_TYPE } from "../../../constants";
import { SectionType } from "../SectionType/SectionType";
import { TextSection } from "./TextSection";
import { ChecklistSection } from "./ChecklistSection";
import { SectionTitle } from "./SectionTitle";
import { SectionFiles } from "../SectionFiles/SectionFiles";
import { checklistSection, textSection } from "../../../types/tabs";
import { SectionFileUpload } from "../SectionFileUpload/SectionFileUpload";
import { useProcessPlanner } from "../../../hooks/useProcessPlanner";
import { removeFile } from "../../../utils/storage";
import styles from "./Section.module.scss";

export const Section = ({
  canEditStructure,
  canEditContent,
  section,
  onChange,
  onDelete,
}) => {
  const { userType, deleteFile, getSectionFiles, plannerInfo } = useProcessPlanner();

  const handleFileRemove = useCallback(
    async (fileKey) => {
      deleteFile(fileKey);
      await removeFile(fileKey);
    },
    [deleteFile]
  );

  const handleTypeChange = useCallback(
    (type) => {
      onChange(section.id, {
        ...section,
        type,
      });
    },
    [onChange, section]
  );

  const handleTextChange = useCallback(
    (event) => {
      const text = event.target.value;

      onChange(section.id, {
        ...section,
        text,
      });
    },
    [onChange, section]
  );

  const handleChecklistChange = useCallback(
    (items) => {
      onChange(section.id, {
        ...section,
        items,
      });
    },
    [onChange, section]
  );

  const handleTitleChange = useCallback(
    (title) => {
      onChange(section.id, {
        ...section,
        title,
      });
    },
    [onChange, section]
  );

  const sectionFiles = getSectionFiles(section.id);

  const canEditFiles = canEditContent && userType === USER_TYPE.student;

  const isReadOnlySection =
    !canEditStructure ||
    (section.type === SECTION_TYPE.text && Boolean(section.text)) ||
    (section.type === SECTION_TYPE.checklist &&
      section.items &&
      section.items.length > 0);

  return (
    <div className={classNames(styles.section, styles[section.type])}>
      <SectionTitle
        id={section.id}
        canEdit={canEditStructure}
        title={section.title}
        onChange={handleTitleChange}
        onDelete={onDelete}
      />
      <SectionType
        type={section.type}
        id={section.id}
        onChange={handleTypeChange}
        readOnly={isReadOnlySection}
      />
      {section.type === SECTION_TYPE.text && (
        <TextSection
          value={section.text || ""}
          onChange={handleTextChange}
          canEdit={canEditContent}
          minWordCount={plannerInfo.minWordsCount || 50}
        />
      )}
      {section.type === SECTION_TYPE.checklist && (
        <ChecklistSection
          items={section.items || []}
          onChange={handleChecklistChange}
          canEdit={canEditContent}
        />
      )}
      <div className={styles.sectionFiles}>
        {sectionFiles && (
          <SectionFiles
            files={sectionFiles}
            canEdit={canEditFiles}
            onFileRemove={handleFileRemove}
          />
        )}
        {canEditFiles && <SectionFileUpload sectionId={section.id} />}
      </div>
    </div>
  );
};

Section.propTypes = {
  canEditStructure: PropTypes.bool,
  canEditContent: PropTypes.bool,
  section: PropTypes.oneOfType([
    PropTypes.shape(textSection),
    PropTypes.shape(checklistSection),
  ]),
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
