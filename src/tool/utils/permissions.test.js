import { setTabsPermissions } from "./permissions";

describe("utils/permissions", () => {
  describe("setTabsPermissions", () => {
    test("adds correct permissions to each tab when not in read-only mode", () => {
      const ownerId = "02";
      const tabs = [
        { title: "My tab", ownerId: "02" },
        { title: "Other tab", ownerId: "01" },
      ];

      const result = setTabsPermissions(tabs, ownerId, false);
      expect(result).toEqual([
        {
          ownerId: "02",
          permissions: {
            canChangeDescription: true,
            canDelete: true,
            canEditContent: true,
            canEditStructure: true,
            canEditTab: true,
          },
          title: "My tab",
        },
        {
          ownerId: "01",
          permissions: {
            canChangeDescription: false,
            canDelete: false,
            canEditContent: true,
            canEditStructure: false,
            canEditTab: false,
          },
          title: "Other tab",
        },
      ]);
    });

    test("adds correct permissions to each tab when in read-only mode", () => {
      const ownerId = "02";
      const tabs = [
        { title: "My tab", ownerId: "01" },
        { title: "Other tab", ownerId: "01" },
      ];

      const result = setTabsPermissions(tabs, ownerId, false);
      expect(result).toEqual([
        {
          ownerId: "01",
          permissions: {
            canChangeDescription: false,
            canDelete: false,
            canEditContent: true,
            canEditStructure: false,
            canEditTab: false,
          },
          title: "My tab",
        },
        {
          ownerId: "01",
          permissions: {
            canChangeDescription: false,
            canDelete: false,
            canEditContent: true,
            canEditStructure: false,
            canEditTab: false,
          },
          title: "Other tab",
        },
      ]);
    });
  });
});
