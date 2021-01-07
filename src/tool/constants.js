export const MAX_UPLOAD_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const USER_TYPE = {
  instructor: "instructor",
  student: "learner",
};

export const ACCESS_LEVELS = {
  full: "full",
  partial: "partial",
  readonly: "readonly",
};

export const SECTION_TYPE = {
  text: "text",
  checklist: "checklist",
};

export const EMPTY_INFO = {
  canAddTab: true,
  studentAccessLevel: ACCESS_LEVELS.readonly,
  dueDate: "",
  minWordsCount: 50,
  minChecklistItems: 3,
  maxScore: 100,
};

export const EMPTY_TAB = {
  permissions: {
    canEditStructure: true, // can add / rename / delete sections
    canEditContent: true, // can modify content of the sections
    canEditTab: true, // can rename tab and change its position by drag & drop
    canDelete: true, // can delete tab
    canChangeDescription: true, // can update tab description - right column
  },
  title: "New Tab",
  content: {
    paneSize: 50,
    description: "",
    sections: [],
  },
};

export const EMPTY_SECTION = {
  type: "text",
  title: "New Section Title",
  text: "",
  items: [],
};

export const EMPTY_TOOL_HOMEWORK_DATA = {
  plannerData: [EMPTY_TAB],
};
