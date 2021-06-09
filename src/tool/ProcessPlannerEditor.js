import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { ProcessPlannerProvider } from "./context/processPlannerProvider";
import { ProcessPlannerContent } from "./components/ProcessPlanner/ProcessPlannerContent";
import { setTabsPermissions } from "./utils/permissions";
import { Config } from "./components/Config/Config";
import { Meta } from "./components/Meta/Meta";
import { USER_TYPE } from "./constants";

const ProcessPlannerEditor = ({
  isUseAutoScore,
  isLimitedEditing,
  userId,
  toolAssignmentData,
  updateToolAssignmentData,
}) => {
  const initialData = useMemo(() => {
    return {
      activeTab: 0,
      plannerData: setTabsPermissions(
        toolAssignmentData.plannerData,
        userId,
        isLimitedEditing
      ),
      info: {
        canAddTab: !isLimitedEditing,
        ...toolAssignmentData.plannerConfig,
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!updateToolAssignmentData || !userId) {
    return null;
  }

  return (
    <ProcessPlannerProvider
      onDataUpdate={updateToolAssignmentData}
      userId={userId}
      userType={USER_TYPE.instructor}
      isLimitedEditing={isLimitedEditing}
      forceFullAccess
    >
      <Meta mode="Instructor :: Edit Assignment" />
      <Config useAutoScore={isUseAutoScore} />
      <ProcessPlannerContent data={initialData} isTeacher />
    </ProcessPlannerProvider>
  );
};

ProcessPlannerEditor.propTypes = {
  isUseAutoScore: PropTypes.bool,
  isLimitedEditing: PropTypes.bool,
  userId: PropTypes.string,
  updateToolAssignmentData: PropTypes.func.isRequired,
};

export default ProcessPlannerEditor;
