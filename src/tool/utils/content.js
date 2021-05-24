import { v4 as uuid } from "uuid";
import { ACCESS_LEVELS, EMPTY_SECTION, USER_TYPE } from "../constants";

const changeTabContent = (tabs, index, content) => [
  ...tabs.slice(0, index),
  {
    ...tabs[index],
    content: {
      ...tabs[index].content,
      ...content,
    },
  },
  ...tabs.slice(index + 1),
];

export const changePaneSize = (tabs, index, size) =>
  changeTabContent(tabs, index, {
    paneSize: size,
  });

export const changeTabDescription = (tabs, index, html) =>
  changeTabContent(tabs, index, {
    description: html,
  });

export const changeTabSection = (tabs, index, sectionId, section) => {
  const tabSections = tabs[index].content.sections;
  const sectionIndex = tabSections.findIndex(
    (section) => section.id === sectionId
  );

  if (sectionIndex < 0) {
    return tabs;
  }

  return changeTabContent(tabs, index, {
    sections: [
      ...tabSections.slice(0, sectionIndex),
      {
        id: sectionId,
        ...section,
      },
      ...tabSections.slice(sectionIndex + 1),
    ],
  });
};

export const addTabSection = (tabs, index, ownerId) => {
  const tabSections = tabs[index].content.sections || [];

  return changeTabContent(tabs, index, {
    sections: [
      ...tabSections,
      {
        ...EMPTY_SECTION,
        ownerId,
        id: uuid(),
      },
    ],
  });
};

export const deleteTabSection = (tabs, index, sectionId) => {
  const tabSections = tabs[index].content.sections.filter(
    (section) => section.id !== sectionId
  );

  return changeTabContent(tabs, index, {
    sections: [...tabSections],
  });
};

export const canUserModifySection = (
  sectionOwnerId,
  userId,
  userType,
  accessLevel
) => {
  if (accessLevel === ACCESS_LEVELS.readonly) {
    return false;
  }

  if (sectionOwnerId === userId) {
    return true;
  }

  if (accessLevel === ACCESS_LEVELS.full && userType === USER_TYPE.student) {
    return true;
  }

  return false;
};

export const canAddSection = (userType, accessLevel) => {
  return true;
  // if (
  //   userType === USER_TYPE.instructor ||
  //   accessLevel !== ACCESS_LEVELS.readonly
  // ) {
  //   return true;
  // }

  // return false;
};

export default {
  changePaneSize,
  changeTabDescription,
  changeTabSection,
  addTabSection,
  deleteTabSection,
  canUserModifySection,
  canAddSection,
};
