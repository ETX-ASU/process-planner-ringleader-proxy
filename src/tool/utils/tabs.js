import { v4 as uuid } from "uuid";
import { EMPTY_TAB, SECTION_TYPE } from "../constants";

export const getNewTabData = (ownerId) => ({
  ...EMPTY_TAB,
  ownerId,
  id: uuid(),
});

export const createTab = (tabs, ownerId) => {
  const newTabData = getNewTabData(ownerId);
  newTabData.title = `${newTabData.title} ${tabs.length}`;

  return [...tabs, newTabData];
};

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

export const removeTabPermissions = (tabs) => {
  return tabs.map(({ permissions, ...tab }) => {
    const modifiedTab = {
      ...tab,
      content: {
        ...tab.content,
        sections: Array.isArray(tab.content.sections)
          ? tab.content.sections.map((section) => {
              if (
                section.type === SECTION_TYPE.checklist &&
                section.items.length > 0
              ) {
                return {
                  ...section,
                  items: section.items.map(({ createdByTeacher, ...item }) => ({
                    ...item,
                  })),
                };
              }

              return section;
            })
          : tab.content.sections,
      },
    };

    return modifiedTab;
  });
};

export default {
  createTab,
  changeTabTitle,
  deleteTab,
  reorderTabs,
  removeTabPermissions,
};
