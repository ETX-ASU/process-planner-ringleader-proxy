import { useEffect, useState } from "react";

export const Meta = ({ mode }) => {
  const [prevTitle, setPrevTitle] = useState(null);

  useEffect(() => {
    if (!prevTitle) {
      setPrevTitle(document.title);
    }

    document.title = mode;

    return () => {
      document.title = prevTitle;
    };
  }, [mode, prevTitle]);

  return null;
};
