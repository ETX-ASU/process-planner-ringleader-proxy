import { ACCESS_LEVELS } from "../constants";

export const setTabsPermissions = (
  tabs,
  userId,
  isLimitedEditing,
  studentAccessMode
) =>
  tabs.map((tab) => {
    const isTabOwner = userId === tab.ownerId;

    return {
      ...tab,
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
