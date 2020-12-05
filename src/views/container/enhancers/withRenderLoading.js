import React from 'react';
import { compose, branch, renderComponent, defaultProps } from 'recompose';
import { Skeleton } from 'antd';
import ContentWrapper from '~/views/presentation/ui/container/ContentWrapper';

export default compose(
	defaultProps({
		nameLoading: "data"
	}),
	branch(
		props => {
			if(props.reducer.loading){
				return !props.reducer[props.nameLoading] ? true : false;
			} else {
				return !props.reducer[props.nameLoading] ? true : false;
			}
		},
		renderComponent(() => (
			<ContentWrapper>
				<Skeleton active />
				<Skeleton active />
				<Skeleton active />
				<Skeleton active />
			</ContentWrapper>
		))
	)
);
