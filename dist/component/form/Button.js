function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  prefixIcon: PropTypes.node,
  sufixIcon: PropTypes.node,
  invertButton: PropTypes.bool
};
const defaultProps = {
  className: '',
  invertButton: false
};

const Button = props => {
  const {
    children,
    className,
    invertButton,
    prefixIcon,
    sufixIcon,
    ...buttonProps
  } = props;
  const buttonClassname = classNames('button', className, {
    'prefix-btn': prefixIcon,
    'button-invert': invertButton,
    'sufix-btn': sufixIcon
  });
  return /*#__PURE__*/React.createElement("button", _extends({}, buttonProps, {
    className: buttonClassname
  }), prefixIcon && prefixIcon, children, sufixIcon && sufixIcon);
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;