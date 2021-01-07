import React, { useCallback, useEffect, useMemo, useState } from "react";
import { mapAssignmentsToList } from "./utils";
import { AssignmentsSection } from "./AssignmentsSection";
import styles from "./AssignmentsList.module.scss";

export const AssignmentsList = ({ list }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(mapAssignmentsToList(list));
  }, [list]);

  const handleItemChange = useCallback((id, data) => {
    setItems((items) => {
      const changedIndex = items.findIndex((item) => item.id === id);

      if (changedIndex >= 0) {
        return [
          ...items.slice(0, changedIndex),
          {
            ...items[changedIndex],
            ...data,
          },
          ...items.slice(changedIndex + 1),
        ];
      }

      return items;
    });
  }, []);

  const starredItems = useMemo(() => {
    return items.filter((item) => item.isFavorite && !item.isArchived);
  }, [items]);

  const archivedItems = useMemo(() => {
    return items.filter((item) => item.isArchived);
  }, [items]);

  return (
    <div className={styles.list}>
      <AssignmentsSection
        title="Planners"
        items={items}
        onItemChange={handleItemChange}
        isOpen
      />
      <AssignmentsSection
        title="Starred"
        items={starredItems}
        onItemChange={handleItemChange}
        isOpen={false}
      />
      <AssignmentsSection
        title="Archived"
        items={archivedItems}
        onItemChange={handleItemChange}
        isOpen={false}
      />
    </div>
  );
};
