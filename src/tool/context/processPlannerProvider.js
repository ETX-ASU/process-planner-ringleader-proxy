import React, { useCallback, useEffect, useState } from "react";
import { ProcessPlannerContext } from "./processPlannerContext";
import tabUtils from "../utils/tabs";
import contentUtils from "../utils/content";
import fileUtils from "../utils/files";
import { USER_TYPE } from "../constants";

export const ProcessPlannerProvider = ({
  onDataUpdate,
  userId,
  userType,
  isLimitedEditing,
  forceFullAccess,
  children,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [plannerData, setPlannerData] = useState([]);
  const [plannerInfo, setPlannerInfo] = useState(null);
  const [files, setFiles] = useState([]);

  const createTab = useCallback(
    () => setPlannerData((tabs) => tabUtils.createTab(tabs, userId)),
    [userId]
  );

  const deleteTab = useCallback((index) => {
    setPlannerData((tabs) => tabUtils.deleteTab(tabs, index));
  }, []);

  const changeTabTitle = useCallback((index, newTitle) => {
    setPlannerData((tabs) => tabUtils.changeTabTitle(tabs, index, newTitle));
  }, []);

  const changePaneSize = useCallback((index, size) => {
    setPlannerData((tabs) => contentUtils.changePaneSize(tabs, index, size));
  }, []);

  const changeTabDescription = useCallback((index, html) => {
    setPlannerData((tabs) =>
      contentUtils.changeTabDescription(tabs, index, html)
    );
  }, []);

  const changeTabSection = useCallback((index, sectionId, section) => {
    setPlannerData((tabs) =>
      contentUtils.changeTabSection(tabs, index, sectionId, section)
    );
  }, []);

  const addTabSection = useCallback(
    (index) => {
      setPlannerData((tabs) => contentUtils.addTabSection(tabs, index, userId));
    },
    [userId]
  );

  const deleteTabSection = useCallback((index, sectionId) => {
    setPlannerData((tabs) =>
      contentUtils.deleteTabSection(tabs, index, sectionId)
    );
  }, []);

  const reorderTabs = useCallback((sourceId, destinationId) => {
    setPlannerData((tabs) =>
      tabUtils.reorderTabs(tabs, sourceId, destinationId)
    );
  }, []);

  const addFile = useCallback((sectionId, fileKey, fileName) => {
    setFiles((files) =>
      fileUtils.addFile(files, { sectionId, fileKey, fileName })
    );
  }, []);

  const deleteFile = useCallback((fileKey) => {
    setFiles((files) => fileUtils.deleteFile(files, fileKey));
  }, []);

  const getSectionFiles = useCallback(
    (sectionId) => {
      return fileUtils.getSectionFiles(files, sectionId);
    },
    [files]
  );

  const canModifySection = (sectionOwnerId) =>
    isLimitedEditing
      ? false
      : forceFullAccess
      ? true
      : contentUtils.canUserModifySection(
          userId,
          sectionOwnerId,
          userType,
          plannerInfo.studentAccessLevel
        );

  const canAddSection = () =>
    isLimitedEditing
      ? false
      : contentUtils.canAddSection(userType, plannerInfo.studentAccessLevel);

  useEffect(() => {
    const dataWithoutPermissions = tabUtils.removeTabPermissions(plannerData);
    const { canAddTab, ...plannerConfig } = plannerInfo || {};

    onDataUpdate({
      plannerData: dataWithoutPermissions,
      plannerConfig,
      files: userType === USER_TYPE.student ? files : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plannerData, plannerInfo, files]);

  const value = {
    activeTab,
    setActiveTab,
    plannerData,
    setPlannerData,
    plannerInfo,
    setPlannerInfo,
    createTab,
    deleteTab,
    changeTabTitle,
    changePaneSize,
    changeTabDescription,
    changeTabSection,
    addTabSection,
    deleteTabSection,
    reorderTabs,
    userType,
    canModifySection,
    canAddSection,
    files,
    setFiles,
    addFile,
    deleteFile,
    getSectionFiles,
  };

  return (
    <ProcessPlannerContext.Provider value={value}>
      {children}
    </ProcessPlannerContext.Provider>
  );
};
