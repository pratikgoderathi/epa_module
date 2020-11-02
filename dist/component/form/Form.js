function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import FormItem from "./FormItem";
const propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired
};
const defaultProps = {
  className: ""
};

function Form(props) {
  const {
    children,
    className,
    ...otherProps
  } = props;
  const formClassName = classNames("form", className);
  return /*#__PURE__*/React.createElement("form", _extends({}, otherProps, {
    className: formClassName
  }), children);
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;
Form.FormItem = FormItem;
export default Form;