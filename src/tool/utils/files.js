export const addFile = (files, newFile) => {
  return [...files, newFile];
};

export const deleteFile = (files, key) =>
  files.filter(({ fileKey }) => fileKey !== key);

export const getSectionFiles = (files, sectionId) =>
  files.filter((file) => file.sectionId === sectionId);

export default {
  addFile,
  deleteFile,
  getSectionFiles,
};
