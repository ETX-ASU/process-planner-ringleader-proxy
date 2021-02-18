import { ACCESS_LEVELS, SECTION_TYPE } from "../constants";

export const setTabsPermissions = (
  tabs,
  userId,
  isLimitedEditing,
  studentAccessMode
) =>
  tabs.map((tab) => {
    const isTabOwner = userId === tab.ownerId;

    const modifiedTab = {
      ...tab,
      content: {
        ...tab.content,
        sections: Array.isArray(tab.content.sections)
          ? tab.content.sections.map(section => {
            if (studentAccessMode === ACCESS_LEVELS.full) {
              return section;
            }

            if (section.type === SECTION_TYPE.checklist && section.ownerId !== userId && section.items.length > 0) {
              return {
                ...section,
                items: section.items.map(item => ({
                  ...item,
                  createdByTeacher: true
                }))
              }
            }

            return section;
          })
          : tab.content.sections
      }
    };

    return {
      ...modifiedTab,
      permissions: {
        canEditStructure: !isLimitedEditing && isTabOwner,
        canEditContent: !isLimitedEditing,
        canEditTab:
          !isLimitedEditing &&
          (isTabOwner || studentAccessMode === ACCESS_LEVELS.full),
        canDelete:
          !isLimitedEditing &&
          (isTabOwner || studentAccessMode === ACCESS_LEVELS.full),
        canChangeDescription: !isLimitedEditing && isTabOwner,
      },
    };
  });
