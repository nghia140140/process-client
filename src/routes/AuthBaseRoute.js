import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { compose } from 'recompose';

import { AppContentWrapper } from '~/views/presentation/ui/container';

const AuthBaseRoute = ({
	routes,
	redirectURL,
	sidebarMenu
}) => {
	return (
		<div>
			<AppContentWrapper sidebarMenu={sidebarMenu}>
				<Switch>
					{routes.map(r => {
						const exact = r.exact || false;
						return (
							<Route
								path={r.path}
								component={r.component}
								exact={exact}
								key={r.path}
							/>
						);
					})}
					<Redirect to={redirectURL} />
				</Switch>
			</AppContentWrapper>
		</div>
	);
};

export default compose()(AuthBaseRoute);
