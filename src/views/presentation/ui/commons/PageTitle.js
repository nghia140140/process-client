import React from 'react';
import strings from '~/localization'

const PageTitle = ({
	title,
	subTitle,
	breadcrumb = [{
		title : '',
		link : '#'
	}],
	children
}) => {
	return (
		<div className="pageheader">
				<h2>
					{title} <span className='pl-1'>{subTitle}</span>
				</h2>
				<div className="page-bar">
					<ul className="page-breadcrumb">
						<li >
							<a href="/">
								<i className="fa fa-home" /><span className='ml-1'>{strings.home}</span>
							</a>
						</li>
						{
							(breadcrumb || []).map((item, idx) =>(<li key={idx}><a href={item.link || '#'}>{item.title || ''}</a></li>))
						}
						
					</ul>
					<div className="page-toolbar">
						{children}
					</div>
				</div>
			</div>
	)
}

export default PageTitle
