import { calculateProgress, calculateScorePercentage } from "./progress";
import { mockPlannerData } from "../mocks/mockDefaultData";
import { mockPlannerData as mockReadOnlyData } from "../mocks/mockReadOnlyData";

describe("utils/progress", () => {
  describe("calculateProgress", () => {
    test("returns percentage of filled sections", () => {
      const result = calculateProgress(mockPlannerData);

      expect(result).toBe(0.6);
    });
  });

  describe("calculateScorePercentage", () => {
    test("returns percentage of the total score for given requirements", () => {
      const result = calculateScorePercentage(mockPlannerData, 5, 3);

      expect(result).toBe(0.6);
    });

    test("returns 0 if the requirements are not met", () => {
      const result = calculateScorePercentage(mockPlannerData, 50, 30);

      expect(result).toBe(0);
    });

    test("returns 1 if all requirements are met", () => {
      const result = calculateScorePercentage(mockReadOnlyData, 1, 0);

      expect(result).toBe(1);
    });
  });
});
