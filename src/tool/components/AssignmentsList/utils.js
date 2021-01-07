import { API } from "aws-amplify";
import { reportError } from "../../../developer/DevUtils";
import { updateAssignment as updateAssignmentMutation } from "../../../graphql/mutations";

export const mapAssignmentsToList = (list) =>
  (list || []).map((item) => {
    return {
      id: item.id,
      course: item.courseId,
      planner: item.title,
      dueDate: item.toolAssignmentData?.plannerConfig?.dueDate
        ? +new Date(item.toolAssignmentData?.plannerConfig?.dueDate)
        : "",
      createdAt: +new Date(item.createdAt),
      updatedAt: item.updatedAt ? +new Date(item.updatedAt) : "",
      isFavorite: item.isFavorite,
      isArchived: item.isArchived,
    };
  });

export const sortListBy = (items, sortBy, sortDir) => {
  return items.slice(0).sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (aVal === bVal) {
      return 0;
    }

    if (sortDir === "asc") {
      return aVal < bVal ? -1 : 1;
    }

    return aVal < bVal ? 1 : -1;
  });
};

export const createItemUpdater = (item) => {
  return async (data) => {
    const inputData = {
      id: item.id,
      title: item.planner,
      courseId: item.course,
      ...data,
    };

    try {
      await API.graphql({
        query: updateAssignmentMutation,
        variables: { input: inputData },
      });
    } catch (error) {
      reportError(
        error,
        `We're sorry. An error occurred while trying to update your assignment. Please wait a moment and try again.`
      );
    }
  };
};
