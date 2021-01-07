import React, { useCallback, useMemo, useState } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { SortHeader } from "./SortHeader";
import { AssignmentItem } from "./AssignmentItem";
import { assignmentColumns } from "./constants";
import { sortListBy } from "./utils";
import styles from "./AssignmentsList.module.scss";

export const AssignmentsSection = ({ title, items, onItemChange, isOpen }) => {
  const [isHidden, setIsHidden] = useState(!isOpen);
  const [sortBy, setSortBy] = useState("");
  const [sortDir, setSortDir] = useState("asc");

  const sortedItems = useMemo(() => {
    return sortListBy(items, sortBy, sortDir);
  }, [sortBy, sortDir, items]);

  const handleHeaderClick = useCallback(
    (value) => {
      if (value === sortBy) {
        setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
      } else {
        setSortDir("asc");
        setSortBy(value);
      }
    },
    [sortBy]
  );

  const toggleHidden = useCallback(() => {
    setIsHidden((flag) => !flag);
  }, []);

  return (
    <div className={styles.section}>
      <h3 onClick={toggleHidden}>
        <FontAwesomeIcon icon={isHidden ? faSortDown : faSortUp} />
        {title}
      </h3>
      {!isHidden && (
        <Table striped bordered hover>
          <thead>
            <tr>
              {assignmentColumns.map(({ id, title, colspan }) => (
                <SortHeader
                  key={id}
                  onClick={handleHeaderClick}
                  id={id}
                  title={title}
                  colspan={colspan}
                  sortBy={sortBy}
                  sortDir={sortDir}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
              <AssignmentItem
                item={item}
                key={item.id}
                onChange={onItemChange}
              />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};
