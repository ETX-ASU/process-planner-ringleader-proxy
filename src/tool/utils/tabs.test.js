import {
  getNewTabData,
  createTab,
  changeTabTitle,
  deleteTab,
  reorderTabs,
  removeTabPermissions,
} from "./tabs";

jest.mock("uuid", () => ({
  v4: () => "123-456",
}));

describe("utils/tabs", () => {
  describe("getNewTabData", () => {
    test("returns correct data structure for the new empty tab", () => {
      const result = getNewTabData();

      expect(result).toEqual({
        content: { description: "", paneSize: 50, sections: [] },
        id: "123-456",
        permissions: {
          canChangeDescription: true,
          canDelete: true,
          canEditContent: true,
          canEditStructure: true,
          canEditTab: true,
        },
        title: "New Tab",
      });
    });

    test("handles ownerId", () => {
      const result = getNewTabData("03");

      expect(result).toEqual({
        content: { description: "", paneSize: 50, sections: [] },
        id: "123-456",
        ownerId: "03",
        permissions: {
          canChangeDescription: true,
          canDelete: true,
          canEditContent: true,
          canEditStructure: true,
          canEditTab: true,
        },
        title: "New Tab",
      });
    });
  });

  describe("createTab", () => {
    test("appends new tab to the list of tabs", () => {
      const tabs = [{ title: "First tab" }];

      const result = createTab(tabs);

      expect(result.length).toBe(2); // new tab is added
      expect(result[0].title).toBe("First tab"); // first tab didn't change
      expect(result[1].title).toBe("New Tab"); // new tab is added
    });
  });

  describe("changeTabTitle", () => {
    test("changes title of the tab at given index", () => {
      const tabs = [{ title: "First tab" }, { title: "Second tab" }];

      const result = changeTabTitle(tabs, 1, "Changed");
      expect(result[0].title).toBe("First tab"); // first tab didn't change
      expect(result[1].title).toBe("Changed");
    });

    test("returns source tabs if element with given index does not exist", () => {
      const tabs = [{ title: "First tab" }, { title: "Second tab" }];

      const result = changeTabTitle(tabs, 10, "Changed");
      expect(result).toEqual(tabs);
    });
  });

  describe("deleteTab", () => {
    test("removes tab at given index", () => {
      const tabs = [{ title: "First tab" }, { title: "Second tab" }];

      const result = deleteTab(tabs, 1);
      expect(result[0].title).toBe("First tab"); // first tab didn't change
      expect(result).toEqual([{ title: "First tab" }]);
    });

    test("returns source tabs if element with given index does not exist", () => {
      const tabs = [{ title: "First tab" }, { title: "Second tab" }];

      const result = deleteTab(tabs, 10);
      expect(result).toEqual(tabs);
    });
  });

  describe("reorderTabs", () => {
    test("inserts tab with source ID before the tab with destination ID", () => {
      const tabs = [
        { title: "First tab", id: 1 },
        { title: "Second tab", id: 2 },
        { title: "Third tab", id: 3 },
      ];

      const result = reorderTabs(tabs, 3, 1);

      expect(result).toEqual([
        { title: "Third tab", id: 3 },
        { title: "First tab", id: 1 },
        { title: "Second tab", id: 2 },
      ]);
    });

    test("returns source tabs if destination ID does not exist", () => {
      const tabs = [
        { title: "First tab", id: 1 },
        { title: "Second tab", id: 2 },
        { title: "Third tab", id: 3 },
      ];

      const result = reorderTabs(tabs, 3, 10);
      expect(result).toEqual(tabs);
    });

    test("returns source tabs if source IDs does not exist", () => {
      const tabs = [
        { title: "First tab", id: 1 },
        { title: "Second tab", id: 2 },
        { title: "Third tab", id: 3 },
      ];

      const result = reorderTabs(tabs, 10, 3);
      expect(result).toEqual(tabs);
    });
  });

  describe("removeTabPermissions", () => {
    test("removes permissions key from each tab", () => {
      const tabs = [
        { title: "First tab", permissions: { key: "value" } },
        { title: "Second tab", permissions: { otherKey: "otherValue" } },
      ];

      const result = removeTabPermissions(tabs);

      expect(result).toEqual([{ title: "First tab" }, { title: "Second tab" }]);
    });
  });
});
