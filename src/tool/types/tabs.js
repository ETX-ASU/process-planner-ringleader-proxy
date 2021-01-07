import PropTypes from "prop-types";

export const tabPermissionsProps = {
  canChangeDescription: PropTypes.bool,
  canEditStructure: PropTypes.bool,
  canEditContent: PropTypes.bool,
  canEditTab: PropTypes.bool,
  canDelete: PropTypes.bool,
};

export const textSection = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
};

export const checklistItem = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  done: PropTypes.bool,
};

export const checklistSection = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  items: PropTypes.arrayOf(checklistItem),
};

export const sectionsProps = PropTypes.arrayOf(
  PropTypes.oneOfType([
    PropTypes.shape(textSection),
    PropTypes.shape(checklistSection),
  ])
);

export const tabContent = {
  paneSize: PropTypes.number,
  description: PropTypes.string,
  sections: sectionsProps,
};

export const tabDataProps = {
  permissions: PropTypes.shape(tabPermissionsProps),
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.shape(tabContent),
};
