import React, { useEffect } from "react";
import { Tabs, Tab } from "../Tabs/Tabs";
import { plannerProps } from "../../types/planner";
import { Content } from "../Content/Content";
import { useProcessPlanner } from "../../hooks/useProcessPlanner";
import { calculateProgress } from "../../utils/progress";
import { Info } from "../Info/Info";
import styles from "./ProcessPlannerContent.module.scss";

export const ProcessPlannerContent = ({ data }) => {
  const {
    plannerData,
    plannerInfo,
    setActiveTab,
    setPlannerData,
    setPlannerInfo,
    setFiles,
  } = useProcessPlanner();

  useEffect(() => {
    setActiveTab(data.activeTab);
    setPlannerData(data.plannerData);
    setPlannerInfo(data.info);
    data.files && setFiles(data.files);
  }, [data, setActiveTab, setPlannerData, setPlannerInfo, setFiles]);

  const progress = calculateProgress(plannerData);

  const canAddNewTab = plannerInfo !== null && plannerInfo.canAddTab === true;
  const canShowInfo = plannerInfo !== null && plannerInfo.title;

  return (
    <main className={styles.container}>
      <Tabs canAddNewTab={canAddNewTab}>
        {plannerData.map(({ id, content, ...tabProps }, index) => {
          return (
            <Tab key={id} id={id} {...tabProps}>
              <Content
                tabId={id}
                {...content}
                canEditContent={tabProps.permissions.canEditContent}
                canEditStructure={tabProps.permissions.canEditStructure}
                canChangeDescription={tabProps.permissions.canChangeDescription}
              />
            </Tab>
          );
        })}
      </Tabs>
      {canShowInfo && <Info {...plannerInfo} progress={progress} />}
    </main>
  );
};

ProcessPlannerContent.propTypes = plannerProps;