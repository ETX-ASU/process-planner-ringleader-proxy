export const richTextToolbar = {
  options: [
    "inline",
    "blockType",
    "list",
    "textAlign",
    "colorPicker",
    "link",
    "image",
    "remove",
    "history",
  ],
  inline: {
    inDropdown: true,
    options: ["bold", "italic", "underline", "strikethrough"],
  },
  list: { inDropdown: true },
  textAlign: { inDropdown: true },
  history: { inDropdown: false },
};
