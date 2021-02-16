import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { ProcessPlannerProvider } from "./context/processPlannerProvider";
import { ProcessPlannerContent } from "./components/ProcessPlanner/ProcessPlannerContent";
import { setTabsPermissions } from "./utils/permissions";
import { ACCESS_LEVELS, USER_TYPE } from "./constants";
import { Meta } from "./components/Meta/Meta";
import { YourAccessLevel } from "./components/AccessLevel/YourAccessLevel";

const HomeworkEditor = ({
  assignmentConfig,
  isReadOnly,
  userId,
  summary,
  title,
  toolHomeworkData,
  updateToolHomeworkData,
}) => {
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
        canAddTab:
          !isReadOnly &&
          assignmentConfig.studentAccessLevel !== ACCESS_LEVELS.readonly,
        title,
        studentAccessLevel: isReadOnly
          ? ACCESS_LEVELS.readonly
          : assignmentConfig.studentAccessLevel,
        description: summary,
        dueDate: assignmentConfig.dueDate
          ? +new Date(assignmentConfig.dueDate)
          : undefined,
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!updateToolHomeworkData || !userId) {
    return null;
  }

  return (
    <ProcessPlannerProvider
      onDataUpdate={updateToolHomeworkData}
      userId={userId}
      userType={USER_TYPE.student}
      isLimitedEditing={isReadOnly}
    >
      <Meta mode={`Student :: ${isReadOnly ? "View" : "Create"} Homework`} />
      <YourAccessLevel level={assignmentConfig.studentAccessLevel} />
      <ProcessPlannerContent data={initialData} />
    </ProcessPlannerProvider>
  );
};

HomeworkEditor.propTypes = {
  isUseAutoScore: PropTypes.bool,
  isLimitedEditing: PropTypes.bool,
  summary: PropTypes.string,
  userId: PropTypes.string,
  title: PropTypes.string,
  updateToolHomeworkData: PropTypes.func.isRequired,
};

export default HomeworkEditor;
