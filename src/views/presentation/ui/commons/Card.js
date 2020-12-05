import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const UICard = props => {
	const { icon,iconColor,bgColor,justify,label,value,subSmall,subLabel,link, history } = props;
	const iconType = classNames('mdi', icon);
	const iconStyle = classNames('icon-rounded-sm', `icon-rounded-inverse-${iconColor}`);

	return (
		<div className="stretch-card col panel-primary mb-sm-3 mb-3">
			<div className={`card border-0 border-radius-2 panel-heading`} style={{backgroundColor: `${bgColor}`}}>
				<div className="card-body">
					<a onClick={()=> history && link && history.push(link)}>
						<div className={`d-flex flex-sm-column justify-content-${justify}`}>
							<div className={classNames('text-white', {'ml-3': justify === 'start'})}>
								<div className="d-flex flex-xl-column row text-center flex-sm-inline align-content-center align-items-baseline align-items-md-center align-items-xl-baseline">
									<h3 className="text-white m-auto col-sm-6 col-xl-12">{value}</h3>
									{subSmall && <p className="mb-0 m-auto col-sm-6 col-xl-12">{subSmall}</p>}
									{subLabel && <p className="mb-0 m-auto col-sm-6 col-xl-12 h6">{subLabel}</p>}
								</div>
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	);
};

UICard.defaultProps = {
  bgColor: 'success',
  iconColor: 'success',
  justify: 'between',
  subLabel: '',
  subSmall: ''
};

const {string, number} = PropTypes;

UICard.propTypes = {
	icon: string,
	iconColor: string,
	bgColor: string,
	justify: string,
	label: string,
	value: string,
	subLabel: string
};


export default UICard;
