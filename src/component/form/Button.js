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
  return (
    <button {...buttonProps} className={buttonClassname}>
      {prefixIcon && prefixIcon}
      {children}
      {sufixIcon && sufixIcon}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
