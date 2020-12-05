import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
	getStringWithWord,
	countWords
} from '~/views/utilities/helpers/string';

const limitWord = 10;

const UIBreadcrumb = ({ path }) => {
	return (
		<Breadcrumb
			style={{ fontSize: '14px', fontFamily: 'Roboto', color: '#9b9b9b' }}
			// separator={<Icon type="right" style={{ verticalAlign: 'middle' }} />}
		>
			<Breadcrumb.Item index={-1}>
				<Link to="/">Trang chủ</Link>
			</Breadcrumb.Item>
			{path !== undefined &&
				path.length > 0 &&
				path.map((item, index) => {
					const noLink = item.noLink ? true : false;
					if (index <= path.length - 1) {
						const title =
							countWords(item.title) <= limitWord
								? item.title
								: `${getStringWithWord(item.title, limitWord)}...`;

						return index < path.length - 1 ? (
							<Breadcrumb.Item key={index}>
								{noLink ? title : <Link to={`${item.link}`}>{title}</Link>}
							</Breadcrumb.Item>
						) : (
							<Breadcrumb.Item key={index}>{title}</Breadcrumb.Item>
						);
					} else return '';
				})}
		</Breadcrumb>
	);
};

UIBreadcrumb.propTypes = {
	path: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			link: PropTypes.string.isRequired
		})
	)
};

export default UIBreadcrumb;
