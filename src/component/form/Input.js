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
const Input = forwardRef((props, ref) => {
  const { id, label } = props;

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
  inputClassName = classNames(
    "form-input",
    { "input-suffix": suffix, "input-prefix": prefix },
    inputClassName
  );

  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <div className="input_container">
        {prefix && prefix}
        <input ref={ref} {...inputProps} className={inputClassName} />
        {suffix && suffix}
      </div>
    </div>
  );
});

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
