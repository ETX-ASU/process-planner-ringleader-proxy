import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";

const icon = {
  asc: faSortDown,
  desc: faSortUp,
};

export const SortHeader = ({
  onClick,
  id,
  title,
  colspan,
  sortBy,
  sortDir,
}) => {
  return (
    <th onClick={() => onClick(id)} colSpan={colspan || 1}>
      <span>{title}</span>
      {sortBy === id ? (
        <FontAwesomeIcon icon={icon[sortDir]} />
      ) : (
        <FontAwesomeIcon icon={faSort} />
      )}
    </th>
  );
};
