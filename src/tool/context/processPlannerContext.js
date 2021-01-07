import { createContext } from "react";
import { v4 as uuid } from "uuid";
import { EMPTY_TAB } from "../constants";
import { noop } from "../utils/core";

export const contextDefaultValue = {
  activeTab: 0,
  plannerData: [
    {
      ...EMPTY_TAB,
      id: uuid(),
    },
  ],
  plannerInfo: null,
  setActiveTab: noop,
  setPlannerData: noop,
  createTab: noop,
  deleteTab: noop,
  changeTabTitle: noop,
  changePaneSize: noop,
  changeTabDescription: noop,
  changeTabSection: noop,
  addTabSection: noop,
  deleteTabSection: noop,
  reorderTabs: noop,
  setPlannerInfo: noop,
};

export const ProcessPlannerContext = createContext(contextDefaultValue);

ProcessPlannerContext.displayName = "ProcessPlannerContext";
