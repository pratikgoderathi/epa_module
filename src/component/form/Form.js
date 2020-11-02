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
  const { children, className, ...otherProps } = props;
  const formClassName = classNames("form", className);
  return (
    <form {...otherProps} className={formClassName}>
      {children}
    </form>
  );
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;
Form.FormItem = FormItem;
export default Form;
