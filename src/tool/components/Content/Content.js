import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "clsx";
import Split from "react-split";
import { USER_TYPE } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";
import { useProcessPlanner } from "../../hooks/useProcessPlanner";
import { RichText } from "../RichText/RichText";
import { AddSectionButton } from "../Sections/AddSection/AddSectionButton";
import { Section } from "../Sections/Section/Section";
import { sectionsProps } from "../../types/tabs";
import styles from "./Content.module.scss";

export const Content = ({
  canEditContent,
  canEditStructure, // TODO GOGO: this prop seems to be obsolete. Get rid of it
  canChangeDescription,
  tabIndex,
  onChange,
  ...content
}) => {
  const {
    changePaneSize,
    changeTabDescription,
    changeTabSection,
    addTabSection,
    deleteTabSection,
    canModifySection,
    canAddSection,
    userType,
  } = useProcessPlanner();

  const gutterRef = useRef();

  const gutter = useCallback(() => {
    return gutterRef.current;
  }, []);

  const handleDragEnd = useCallback(
    (sizes) => {
      changePaneSize(tabIndex, sizes[0]);
    },
    [changePaneSize, tabIndex]
  );

  const handleDescriptionChange = useCallback(
    (html) => {
      changeTabDescription(tabIndex, html);
    },
    [changeTabDescription, tabIndex]
  );

  const handleSectionChange = useCallback(
    (sectionId, sectionData) => {
      changeTabSection(tabIndex, sectionId, sectionData);
    },
    [changeTabSection, tabIndex]
  );

  const handleAddSectionClick = useCallback(
    () => addTabSection(tabIndex),
    [addTabSection, tabIndex]
  );

  const handleDeleteSectionClick = useCallback(
    (id) => deleteTabSection(tabIndex, id),
    [deleteTabSection, tabIndex]
  );

  const renderDescription = (w) => (
    <div 
      className={styles.description}
      style={{ width: w === undefined ? undefined : `${w}%`, flex: "initial" }}
    >
      {(userType === USER_TYPE.instructor || Boolean(content.description)) && (
        <div className={styles.title}>General instructions for this tab</div>
      )}
      {canChangeDescription ? (
        <RichText
          html={content.description}
          onChange={handleDescriptionChange}
          placeholder="Use this panel for instructions or informations for this tab…"
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content.description }} />
      )}
    </div>
  );

  const renderSections = () => (
    <div className={styles.sections}>
      {(content.sections || []).map((section) => {
        return (
          <Section
            key={section.id}
            canEditStructure={canModifySection(section.ownerId)}
            canEditContent={canEditContent}
            section={section}
            onChange={handleSectionChange}
            onDelete={handleDeleteSectionClick}
          />
        );
      })}
      {canAddSection() && <AddSectionButton onClick={handleAddSectionClick} />}
    </div>
  );

  const splitProps = {
    className: styles.split,
    dragInterval: 20,
    gutterSize: 20,
    gutter,
    minSize: 300,
    sizes: [100 - content.paneSize, content.paneSize],
    onDragEnd: handleDragEnd,
  };

  return (
    <div>
      <div
        className={classNames(
          styles.gutter,
          !canEditStructure && styles.invisible
        )}
        ref={gutterRef}
      >
        <FontAwesomeIcon icon={faArrowsAltH} />
      </div>
      {canEditStructure ? (
        <Split {...splitProps}>
          {renderDescription()}
          {renderSections()}
        </Split>
      ) : (
        <div className={classNames(styles.split, styles.readOnly)}>
          {renderDescription(100 - content.paneSize)}
          {renderSections()}
        </div>
      )}
    </div>
  );
};

Content.propTypes = {
  canEditContent: PropTypes.bool,
  canEditStructure: PropTypes.bool,
  canChangeDescription: PropTypes.bool,
  tabIndex: PropTypes.number,
  onChange: PropTypes.func,
  paneSize: PropTypes.number,
  description: PropTypes.string,
  sections: sectionsProps,
};
