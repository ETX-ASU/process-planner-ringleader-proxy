import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStarSolid,
  faFileArchive as faFileArchiveSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faStar, faFileArchive } from "@fortawesome/free-regular-svg-icons";
import { createItemUpdater } from "./utils";
import styles from "./AssignmentsList.module.scss";

export const AssignmentItem = ({ onChange, item }) => {
  const handleRowClick = useCallback(() => {
    document.location.search = `${document.location.search}&assignmentId=${item.id}`;
  }, [item.id]);

  const updateFun = createItemUpdater(item);

  const handleFavoriteToggle = useCallback(
    async (event) => {
      event.stopPropagation();

      const data = {
        isFavorite: !item.isFavorite,
      };

      updateFun(data);
      onChange(item.id, data);
    },
    [item.id, item.isFavorite, onChange, updateFun]
  );

  const handleArchiveToggle = useCallback(
    async (event) => {
      event.stopPropagation();

      const data = {
        isArchived: !item.isArchived,
      };

      updateFun(data);
      onChange(item.id, data);
    },
    [item.id, item.isArchived, onChange, updateFun]
  );

  return (
    <tr onClick={handleRowClick} key={item.id}>
      <td className={styles.noWrap}>{item.course}</td>
      <td>{item.planner}</td>
      <td>
        <div className={styles.actions}>
          <FontAwesomeIcon
            icon={item.isFavorite ? faStarSolid : faStar}
            onClick={handleFavoriteToggle}
          />
          <FontAwesomeIcon
            icon={item.isArchived ? faFileArchiveSolid : faFileArchive}
            onClick={handleArchiveToggle}
          />
        </div>
      </td>
      <td className={styles.noWrap}>
        {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "-"}
      </td>
      <td className={styles.noWrap}>
        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
      </td>
      <td className={styles.noWrap}>
        {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : "-"}
      </td>
    </tr>
  );
};
