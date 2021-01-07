import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { ProcessPlannerProvider } from "./context/processPlannerProvider";
import { ProcessPlannerContent } from "./components/ProcessPlanner/ProcessPlannerContent";
import { Config } from "./components/Config/Config";
import { getNewTabData } from "./utils/tabs";
import { EMPTY_INFO, USER_TYPE } from "./constants";
import { Meta } from "./components/Meta/Meta";

const ProcessPlannerCreator = ({
  isUseAutoScore,
  userId,
  updateToolAssignmentData,
}) => {
  const initialData = useMemo(() => {
    return {
      activeTab: 0,
      plannerData: [getNewTabData(userId)],
      info: EMPTY_INFO,
    };
  }, [userId]);

  if (!updateToolAssignmentData || !userId) {
    return null;
  }

  return (
    <ProcessPlannerProvider
      onDataUpdate={updateToolAssignmentData}
      userId={userId}
      userType={USER_TYPE.instructor}
      isLimitedEditing={false}
      forceFullAccess
    >
      <Meta mode="Instructor :: Create Assignment" />
      <Config useAutoScore={isUseAutoScore} />
      <ProcessPlannerContent data={initialData} />
    </ProcessPlannerProvider>
  );
};

ProcessPlannerCreator.propTypes = {
  isUseAutoScore: PropTypes.bool,
  userId: PropTypes.string,
  updateToolAssignmentData: PropTypes.func.isRequired,
};

export default ProcessPlannerCreator;
