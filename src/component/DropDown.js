import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DropDown = (props) => {
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
		setOpen((prevState) => !prevState);
	};

	let container = classNames('dopdown-container', { 'open': isOpen });
	let head = classNames('dropdown-head', headClassName);
	return (
		<div className={container}>
			<div
				role='button'
				tabIndex='0'
				aria-pressed='false'
				onClick={handleDropDown}
				className={head}>
				{title}
				{/*Total scheme count*/}
				{count ? <span className='count_label'>{count}</span> : null}
				{/*Total amount if any*/}
				{totalAmount ? (
					<>
						<br />
						<br />
						{`TOTAL AMOUNT: ${totalAmount}`}
					</>
				) : (
					''
				)}
				{headerChild && headerChild}
				<span className='dropdown-add-icon'></span>
			</div>
			<div className='dropdown-body'>{children}</div>
		</div>
	);
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
	headClassName: '',
};

export default DropDown;
