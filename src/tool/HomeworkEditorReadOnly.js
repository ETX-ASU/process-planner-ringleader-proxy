import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { ProcessPlannerProvider } from "./context/processPlannerProvider";
import { ProcessPlannerContent } from "./components/ProcessPlanner/ProcessPlannerContent";
import { setTabsPermissions } from "./utils/permissions";
import { ACCESS_LEVELS, USER_TYPE } from "./constants";
import { Meta } from "./components/Meta/Meta";
import { noop } from "./utils/core";

const HomeworkEditorReadOnly = ({
  assignmentConfig,
  userId,
  summary,
  title,
  toolHomeworkData,
}) => {
  const isReadOnly = true;
  const initialData = useMemo(() => {
    return {
      activeTab: 0,
      plannerData: setTabsPermissions(
        toolHomeworkData.plannerData,
        userId,
        isReadOnly,
        assignmentConfig.studentAccessLevel
      ),
      files: toolHomeworkData.files || [],
      info: {
        canAddTab: false,
        title,
        studentAccessLevel: ACCESS_LEVELS.readonly,
        description: summary,
        dueDate: assignmentConfig.dueDate
          ? +new Date(assignmentConfig.dueDate)
          : undefined,
      },
    };
  }, [assignmentConfig.dueDate, assignmentConfig.studentAccessLevel, isReadOnly, summary, title, toolHomeworkData.files, toolHomeworkData.plannerData, userId]);

  if (!userId) {
    return null;
  }

  return (
    <ProcessPlannerProvider
      onDataUpdate={noop}
      userId={userId}
      userType={USER_TYPE.student}
      isLimitedEditing={isReadOnly}
    >
      <Meta mode="Instructor :: Review Homework" />
      <ProcessPlannerContent data={initialData} />
    </ProcessPlannerProvider>
  );
};

HomeworkEditorReadOnly.propTypes = {
  isUseAutoScore: PropTypes.bool,
  isLimitedEditing: PropTypes.bool,
  summary: PropTypes.string,
  userId: PropTypes.string,
  title: PropTypes.string,
};

export default HomeworkEditorReadOnly;
