import { v4 as uuid } from "uuid";
import { EMPTY_TAB } from "../constants";

export const mockEmptyPlanner = {
  plannerData: [
    {
      ...EMPTY_TAB,
      id: uuid(),
    },
  ],
  info: {
    canAddTab: true,
  },
  activeTab: 0,
};
