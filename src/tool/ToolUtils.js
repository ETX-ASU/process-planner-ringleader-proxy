import { v4 as uuid } from "uuid";
import { EMPTY_HOMEWORK, HOMEWORK_PROGRESS } from "../app/constants";
import { calculateProgress, calculateScorePercentage } from "./utils/progress";

export const getHomeworkStatus = (gradeData, homework) => {
  const { gradingProgress } = gradeData;
  // prettier-ignore
  return (gradingProgress === HOMEWORK_PROGRESS.fullyGraded) ? HOMEWORK_PROGRESS.fullyGraded :
    (homework.submittedOnDate) ? HOMEWORK_PROGRESS.submitted :
      (homework.beganOnDate) ? HOMEWORK_PROGRESS.inProgress :
        HOMEWORK_PROGRESS.notBegun;
};

export const calcMaxScoreForAssignment = (assignment) => {
  // TOOL-DEV: Use your own code here to receive toolAssignmentData and use it to return the maximum possible score for this assignment

  return assignment?.toolAssignmentData?.plannerConfig?.maxScore || 100;
};

export const getNewToolHomeworkDataForAssignment = (assignment) => {
  // TOOL-DEV: Use your own code here to receive toolAssignmentData and use it create a new "blank" instance of the assignment
  // (This is the student's homework before the student has done any work on it.)
  return Object.assign({}, EMPTY_HOMEWORK, {
    plannerData: [...assignment.toolAssignmentData.plannerData],
  });
};

export const calcPercentCompleted = (assignment, homework) => {
  // TOOL-DEV: Create a method to calculate and return a percentage of the work a student completed on their homework)
  // This should be returned as a number between 0 and 100
  if (!homework?.id || !homework?.beganOnDate) {
    return 0;
  }

  return Math.round(
    100 * calculateProgress(homework.toolHomeworkData.plannerData)
  );
};

export const getCompletionStatus = (homeworkData) => {
  if (
    !homeworkData ||
    !homeworkData.plannerConfig ||
    !homeworkData.plannerData
  ) {
    return false;
  }

  const reqMinWords = homeworkData.plannerConfig.minWordsCount;
  const reqMinItems = homeworkData.plannerConfig.minChecklistItems;

  const completedFraction = calculateScorePercentage(
    homeworkData.plannerData,
    reqMinWords,
    reqMinItems
  );

  return completedFraction === 1;
};

export const calcAutoScore = (assignment, homework) => {
  // TOOL-DEV: Given the assignment data and a student's current homework data, provide a method to return the grade a  student
  // should receive for their work. The should not go below 0, and should never exceed the value returned by calcMaxScoreForAssignment()
  if (!homework?.id || !homework?.beganOnDate) {
    return 0;
  }

  const requiredMinimumWords =
    assignment?.toolAssignmentData?.plannerConfig?.minWordsCount || 50;
  const requiredMinimumCheckItems =
    assignment?.toolAssignmentData?.plannerConfig?.minChecklistItems || 3;

  const score = calculateScorePercentage(
    homework.toolHomeworkData.plannerData,
    requiredMinimumWords,
    requiredMinimumCheckItems
  );
  const maxScore = calcMaxScoreForAssignment(assignment);

  return Math.round(maxScore * score);
};

export const duplicateAssignment = (assignment, activeUserId, courseId) => {
  const { createdAt, updatedAt, ...assignmentParams } = assignment;

  return Object.assign({}, assignmentParams, {
    title: `Copy of ${assignment.title}`,
    isLinkedToLms: false,
    id: uuid(),
    ownerId: activeUserId,
    courseId,
    lockOnDate: 0,
  });
};

export const calculateWordCount = (text) => {
  return text
    .replace(/[^A-Za-z\s]/g, "")
    .split(" ")
    .filter((token) => token).length;
};
