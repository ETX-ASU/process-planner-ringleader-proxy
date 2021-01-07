import { Storage } from "aws-amplify";

export const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "download";

  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener("click", clickHandler);
    }, 150);
  };

  a.addEventListener("click", clickHandler, false);
  a.click();

  return a;
};

export const downloadFile = async (fileKey, downloadFileName) => {
  return Storage.get(fileKey, { download: true }).then((result) =>
    downloadBlob(result.Body, downloadFileName)
  );
};

export const removeFile = async (fileKey) => Storage.remove(fileKey);

export const getPureFilename = (fileName) => {
  const dotPos = fileName.lastIndexOf(".");

  return fileName.substring(0, dotPos);
};
