import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DropDown = props => {
  const {
    children,
    title,
    open = false,
    count = false,
    totalAmount = false,
    headerChild,
    headClassName
  } = props;
  const [isOpen, setOpen] = useState(open);

  const handleDropDown = () => {
    setOpen(prevState => !prevState);
  };

  let container = classNames('dopdown-container', {
    'open': isOpen
  });
  let head = classNames('dropdown-head', headClassName);
  return /*#__PURE__*/React.createElement("div", {
    className: container
  }, /*#__PURE__*/React.createElement("div", {
    role: "button",
    tabIndex: "0",
    "aria-pressed": "false",
    onClick: handleDropDown,
    className: head
  }, title, count ? /*#__PURE__*/React.createElement("span", {
    className: "count_label"
  }, count) : null, totalAmount ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), `TOTAL AMOUNT: ${totalAmount}`) : '', headerChild && headerChild, /*#__PURE__*/React.createElement("span", {
    className: "dropdown-add-icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: "dropdown-body"
  }, children));
};

DropDown.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  open: PropTypes.bool,
  headerChild: PropTypes.node,
  headClassName: PropTypes.string
};
DropDown.defaultProps = {
  count: false,
  open: false,
  headClassName: ''
};
export default DropDown;