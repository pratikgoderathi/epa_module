function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { createRef, useState } from "react";
import Input from "./Input";
import { eye, eyeSlash } from "../../imageVariables/index";

const PasswordInput = props => {
  const inputRef = /*#__PURE__*/createRef();
  const [showPassword, setShowPassword] = useState(false);
  const {
    className,
    ...inputprops
  } = props;

  const handleShowClick = event => {
    setShowPassword(prevState => !prevState);
  };

  return /*#__PURE__*/React.createElement(Input, _extends({
    type: showPassword ? "text" : "password",
    ref: inputRef
  }, inputprops, {
    suffix: /*#__PURE__*/React.createElement("span", {
      className: "input-password__icon",
      onClick: handleShowClick
    }, /*#__PURE__*/React.createElement("img", {
      src: showPassword ? eye : eyeSlash,
      alt: "password"
    }))
  }));
};

export default PasswordInput;