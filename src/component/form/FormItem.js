import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,

  helperText: PropTypes.string,

  validateStatus: PropTypes.oneOf(['error', '']),
  className: PropTypes.string
};

const defaultProps = {
  className: ''
};

function FormItem(props) {
  const {
    children,
    helperText,
    className,

    validateStatus
  } = props;

  const renderWrapper = (child1, child2) => {
    // const { validateStatus } = props;

    let wrapperClassName = classNames('form-control', {
      'has-error': validateStatus === 'error'
    });

    return (
      <div className={wrapperClassName}>
        {child1}
        {child2}
      </div>
    );
  };

  const renderHelper = () => {
    // const { helperText } = props;

    if (Boolean(helperText)) {
      return <div className='form-item__helper'>{helperText}</div>;
    }

    return null;
  };

  let itemClassName = classNames(
    'form-item',
    {
      'form-item--with-helper': helperText
    },
    className
  );

  return (
    <div className={itemClassName}>
      {renderWrapper(children, renderHelper())}
    </div>
  );
}

FormItem.propTypes = propTypes;
FormItem.defaultProps = defaultProps;

export default FormItem;
