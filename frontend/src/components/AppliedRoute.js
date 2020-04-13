import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: C, props: cProps, ...rest }) => (
	<Route
		{...rest}
		render={({ location, ...rest }) => {
			console.log(rest)
			return cProps.isAuthenticated ? (
				<C  {...cProps} {...rest} />
			) : (
					<Redirect
						to={{
							pathname: "/auth",
							state: { from: location }
						}}
					/>
				)
		}}
	/>

);
