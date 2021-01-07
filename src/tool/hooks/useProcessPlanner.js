import { useContext } from "react";
import { ProcessPlannerContext } from "../context/processPlannerContext";

export const useProcessPlanner = () => useContext(ProcessPlannerContext);
