import { ACCESS_LEVELS, USER_TYPE } from "../constants";
import {
  changePaneSize,
  changeTabDescription,
  changeTabSection,
  addTabSection,
  deleteTabSection,
  canUserModifySection,
} from "./content";

jest.mock("uuid", () => ({
  v4: () => "123-456",
}));

const tabs = [
  {
    id: "111",
    title: "TabName",
    content: {
      paneSize: 50,
      sections: [
        {
          id: "222",
          title: "Quantitive Observations",
          type: "text",
          text: "Lorem ipsum dolor sit amet",
        },
        {
          id: "333",
          title: "Initial Checklist",
          type: "checklist",
          items: [
            {
              id: "444",
              label: "Drink coffee",
              done: true,
            },
            {
              id: "555",
              label: "Finish this section",
              done: false,
            },
          ],
        },
      ],
      description: "<p>Lorem ipsum dolor sit amet.</p>",
    },
  },
];

describe("utils/content", () => {
  describe("changePaneSize", () => {
    test("updates paneSize property", () => {
      const result = changePaneSize(tabs, 0, 30);

      expect(result).toEqual([
        {
          content: {
            description: "<p>Lorem ipsum dolor sit amet.</p>",
            paneSize: 30, // changed
            sections: [
              {
                id: "222",
                text: "Lorem ipsum dolor sit amet",
                title: "Quantitive Observations",
                type: "text",
              },
              {
                id: "333",
                items: [
                  { done: true, id: "444", label: "Drink coffee" },
                  { done: false, id: "555", label: "Finish this section" },
                ],
                title: "Initial Checklist",
                type: "checklist",
              },
            ],
          },
          id: "111",
          title: "TabName",
        },
      ]);
    });
  });

  describe("changeTabDescription", () => {
    test("updates description of the tab", () => {
      const result = changeTabDescription(tabs, 0, "<h1>Title</h1>");

      expect(result).toEqual([
        {
          content: {
            description: "<h1>Title</h1>", // changed
            paneSize: 50,
            sections: [
              {
                id: "222",
                text: "Lorem ipsum dolor sit amet",
                title: "Quantitive Observations",
                type: "text",
              },
              {
                id: "333",
                items: [
                  { done: true, id: "444", label: "Drink coffee" },
                  { done: false, id: "555", label: "Finish this section" },
                ],
                title: "Initial Checklist",
                type: "checklist",
              },
            ],
          },
          id: "111",
          title: "TabName",
        },
      ]);
    });
  });

  describe("changeTabSection", () => {
    test("updates section with given id", () => {
      const result = changeTabSection(tabs, 0, "222", {
        content: "new",
      });

      expect(result).toEqual([
        {
          content: {
            description: "<p>Lorem ipsum dolor sit amet.</p>",
            paneSize: 50,
            sections: [
              { id: "222", content: "new" }, // changed
              {
                id: "333",
                items: [
                  { done: true, id: "444", label: "Drink coffee" },
                  { done: false, id: "555", label: "Finish this section" },
                ],
                title: "Initial Checklist",
                type: "checklist",
              },
            ],
          },
          id: "111",
          title: "TabName",
        },
      ]);
    });

    test("returns source tabs if section with given ID does not exist", () => {
      const result = changeTabSection(tabs, 0, "i-dont-exist", {
        content: "new",
      });

      expect(result).toEqual(tabs);
    });
  });

  describe("addTabSection", () => {
    test("adds new section at the end of the list", () => {
      const result = addTabSection(tabs, 0, "03");

      expect(result).toEqual([
        {
          content: {
            description: "<p>Lorem ipsum dolor sit amet.</p>",
            paneSize: 50,
            sections: [
              {
                id: "222",
                text: "Lorem ipsum dolor sit amet",
                title: "Quantitive Observations",
                type: "text",
              },
              {
                id: "333",
                items: [
                  { done: true, id: "444", label: "Drink coffee" },
                  { done: false, id: "555", label: "Finish this section" },
                ],
                title: "Initial Checklist",
                type: "checklist",
              },
              // new section
              {
                id: "123-456",
                items: [],
                ownerId: "03",
                text: "",
                title: "New Section Title",
                type: "text",
              },
            ],
          },
          id: "111",
          title: "TabName",
        },
      ]);
    });
  });

  describe("deleteTabSection", () => {
    test("removes section with given ID", () => {
      const result = deleteTabSection(tabs, 0, "333");

      expect(result).toEqual([
        {
          content: {
            description: "<p>Lorem ipsum dolor sit amet.</p>",
            paneSize: 50,
            sections: [
              {
                id: "222",
                text: "Lorem ipsum dolor sit amet",
                title: "Quantitive Observations",
                type: "text",
              },
              // checklist section is removed
            ],
          },
          id: "111",
          title: "TabName",
        },
      ]);
    });
  });

  describe("canUserModifySection", () => {
    const teacherId = "01";
    const studentId = "11";

    test("handles instructor", () => {
      const result = canUserModifySection(
        teacherId,
        teacherId,
        USER_TYPE.instructor,
        ACCESS_LEVELS.full
      );

      expect(result).toEqual(true);
    });

    test("handles student with full access", () => {
      const result = canUserModifySection(
        teacherId,
        studentId,
        USER_TYPE.student,
        ACCESS_LEVELS.full
      );

      expect(result).toEqual(true);
    });

    test("handles student with partial access", () => {
      const result = canUserModifySection(
        teacherId,
        studentId,
        USER_TYPE.student,
        ACCESS_LEVELS.partial
      );

      expect(result).toEqual(false);
    });

    test("handles student with read only access", () => {
      const result = canUserModifySection(
        teacherId,
        studentId,
        USER_TYPE.student,
        ACCESS_LEVELS.readonly
      );

      expect(result).toEqual(false);
    });

    test("handles own section of the student with read only access", () => {
      const result = canUserModifySection(
        studentId,
        studentId,
        USER_TYPE.student,
        ACCESS_LEVELS.readonly
      );

      expect(result).toEqual(false);
    });

    test("handles own section of the student with partial access", () => {
      const result = canUserModifySection(
        studentId,
        studentId,
        USER_TYPE.student,
        ACCESS_LEVELS.partial
      );

      expect(result).toEqual(true);
    });
  });
});
