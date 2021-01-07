import { v4 as uuid } from "uuid";
import { EMPTY_TAB } from "../constants";

export const getNewTabData = (ownerId) => ({
  ...EMPTY_TAB,
  ownerId,
  id: uuid(),
});

export const createTab = (tabs, ownerId) => [...tabs, getNewTabData(ownerId)];

export const changeTabTitle = (tabs, index, newTitle) => {
  if (index > tabs.length) {
    return tabs;
  }

  return [
    ...tabs.slice(0, index),
    {
      ...tabs[index],
      title: newTitle,
    },
    ...tabs.slice(index + 1),
  ];
};

export const deleteTab = (tabs, index) =>
  tabs.filter((tab, idx) => idx !== index);

// insert source tab before destination tab
export const reorderTabs = (tabs, sourceId, destinationId) => {
  const sourceTabIndex = tabs.findIndex((tab) => tab.id === sourceId);

  if (sourceTabIndex < 0) {
    return tabs;
  }

  const sourceTab = tabs[sourceTabIndex];

  const tabsWithoutSource = [
    ...tabs.slice(0, sourceTabIndex),
    ...tabs.slice(sourceTabIndex + 1),
  ];

  const destinationIndex = tabsWithoutSource.findIndex(
    (tab) => tab.id === destinationId
  );

  if (destinationIndex < 0) {
    return tabs;
  }

  const resultTabs = [
    ...tabsWithoutSource.slice(0, destinationIndex),
    { ...sourceTab },
    ...tabsWithoutSource.slice(destinationIndex),
  ];

  return resultTabs;
};

export const removeTabPermissions = (tabs) =>
  tabs.map(({ permissions, ...otherProps }) => otherProps);

export default {
  createTab,
  changeTabTitle,
  deleteTab,
  reorderTabs,
  removeTabPermissions,
};
