import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';

import Auth from './containers/Auth';
import Home from './containers/Home';
import Details from './containers/Details'
import NotFound from './containers/NotFound';

export default ({ childProps }) => (
	<Switch>
		<AppliedRoute path="/" exact component={Home} props={childProps} />
		<Route path="/auth" exact component={() => <Auth {...childProps} />} />
		<AppliedRoute path="/detail/:noteId" component={Details} props={childProps} />
		{/* Finally, catch all unmatched routes */}
		<Route component={NotFound} />
	</Switch>
);
