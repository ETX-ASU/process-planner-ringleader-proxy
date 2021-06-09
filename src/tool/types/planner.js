import PropTypes from "prop-types";
import { tabDataProps } from "./tabs";
import { tabInfoProps } from "./info";

export const plannerProps = {
  plannerData: PropTypes.shape(tabDataProps),
  info: PropTypes.shape(tabInfoProps),
  activeTab: PropTypes.number,
  isReadOnly: PropTypes.bool,
};
