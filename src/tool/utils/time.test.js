import { calculateTimeDiff } from "./time";

const now = +new Date("2020-12-08T06:17:49.799Z");
const future = +new Date("2020-12-31T00:00:00.799Z");
const past = +new Date("2020-11-20T10:27:49.799Z");

describe("calculateTimeDiff", () => {
  test("returns correct result when the date is in the future", () => {
    const result = calculateTimeDiff(now, future);

    expect(result).toBe("22d 18h");
  });

  test("returns correct result when the date is in the past", () => {
    const result = calculateTimeDiff(now, past);

    expect(result).toBe("17d 20h ago");
  });
});
