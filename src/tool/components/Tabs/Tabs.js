import React, { cloneElement, Children, useMemo, Fragment } from "react";
import classNames from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useProcessPlanner } from "../../hooks/useProcessPlanner";
import styles from "./Tabs.module.scss";

export * from "./Tab";

export const Tabs = ({
  children,
  contentClassName,
  tabsClassName,
  canAddNewTab,
}) => {
  const {
    activeTab,
    setActiveTab,
    createTab,
    changeTabTitle,
    deleteTab,
    reorderTabs,
  } = useProcessPlanner();

  const childrenArray = useMemo(() => Children.toArray(children), [children]);

  const tabItems = useMemo(() => {
    return Children.map(children, (elementChild, index) => {
      if (elementChild) {
        const isActiveTab = index === activeTab;

        return cloneElement(elementChild, {
          ...elementChild.props,
          permissions: {
            ...elementChild.props?.permissions,
            // cannot delete tab if there's only one
            canDelete:
              elementChild.props?.permissions?.canDelete &&
              childrenArray.length > 1,
          },
          className: classNames(
            elementChild.props.className,
            isActiveTab && styles.active
          ),
          key: index,
          onClick: () => setActiveTab(index),
          onEditTabName: (name) => changeTabTitle(index, name),
          onReorder: (sourceId, destinationId) =>
            reorderTabs(sourceId, destinationId),
          onDeleteClick: () => {
            if (childrenArray.length === 1) {
              return;
            }

            if (index === activeTab) {
              setActiveTab(index > 0 ? index - 1 : 0);
            }
            deleteTab(index);
          },
        });
      }
    });
  }, [
    activeTab,
    changeTabTitle,
    children,
    childrenArray.length,
    deleteTab,
    setActiveTab,
    reorderTabs,
  ]);

  const tabsClassNames = classNames(styles.tabs, tabsClassName);
  const contentClassNames = classNames(styles.content, contentClassName);

  return (
    <div className={styles.wrapper}>
      <div className={tabsClassNames}>
        {tabItems}
        {canAddNewTab && (
          <span className={styles.addTabButton} onClick={createTab}>
            <FontAwesomeIcon icon={faPlus} />
          </span>
        )}
      </div>
      <div className={contentClassNames}>
        {childrenArray.map((tab, index) => (
          <Fragment key={tab.props.id}>
            {index === activeTab
              ? cloneElement(tab.props.children, {
                  ...tab.props.children.props,
                  tabIndex: activeTab,
                })
              : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
