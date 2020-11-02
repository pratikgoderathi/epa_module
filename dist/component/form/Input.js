function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
const propTypes = {
  containerClassName: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  inputClassName: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(["text", "number", "tel", "email", "password", "file"]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  suffix: PropTypes.node,
  prefix: PropTypes.node
};
const defaultProps = {
  type: "text",
  containerClassName: "",
  labelClassName: "",
  inputClassName: ""
};
const Input = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    id,
    label
  } = props;
  let {
    containerClassName,
    labelClassName,
    inputClassName,
    suffix,
    prefix,
    ...inputProps
  } = props;
  containerClassName = classNames("form-input__wrapper", containerClassName);
  labelClassName = classNames("form-input__label", labelClassName);
  inputClassName = classNames("form-input", {
    "input-suffix": suffix,
    "input-prefix": prefix
  }, inputClassName);
  return /*#__PURE__*/React.createElement("div", {
    className: containerClassName
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    className: labelClassName
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "input_container"
  }, prefix && prefix, /*#__PURE__*/React.createElement("input", _extends({
    ref: ref
  }, inputProps, {
    className: inputClassName
  })), suffix && suffix));
});
Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
export default Input;