import { SECTION_TYPE } from "../constants";

export const calculateProgress = (plannerData) => {
  let filled = 0;
  let total = 0;

  plannerData.forEach((tab) => {
    if (tab.content && Array.isArray(tab.content.sections)) {
      tab.content.sections.forEach((section) => {
        total += 1;

        if (section.type === SECTION_TYPE.text && section.text.length >= 1) {
          filled += 1;
        }

        if (
          section.type === SECTION_TYPE.checklist &&
          section.items.length > 0 &&
          section.items.filter((item) => !item.done).length === 0
        ) {
          filled += 1;
        }
      });
    }
  });

  return total !== 0 ? filled / total : 0;
};

export const calculateScorePercentage = (
  plannerData,
  minWords,
  minCheckItems
) => {
  let filled = 0;
  let total = 0;

  plannerData.forEach((tab) => {
    if (tab.content && Array.isArray(tab.content.sections)) {
      tab.content.sections.forEach((section) => {
        total += 1;

        if (section.type === SECTION_TYPE.text) {
          const words = section.text.split(/\W+/).filter((token) => token);
          if (words.length >= minWords) {
            filled += 1;
          }
        }

        if (
          section.type === SECTION_TYPE.checklist &&
          section.items.length >= minCheckItems &&
          section.items.filter((item) => !item.done).length === 0
        ) {
          filled += 1;
        }
      });
    }
  });

  return total !== 0 ? filled / total : 0;
};
