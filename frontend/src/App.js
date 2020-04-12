import React, { Component } from 'react';

import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react'
import Home from './containers/Home'

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: false,
			isAuthenticating: true
		};
	}

	async componentDidMount() {
		console.log('App did mount')
		try {
			if (await Auth.currentSession()) {
				console.log('App did mount and has session')
				this.userHasAuthenticated(true);
			}
		} catch (e) {
			if (e !== 'No current user') {
				console.error(e);
			}
		}

		this.setState({ isAuthenticating: false });
	}

	userHasAuthenticated = authenticated => {
		this.setState({ isAuthenticated: authenticated });
	};



	render() {
		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated
		};
		return (
			<div className="App container">
				{this.state.isAuthenticated && <Home {...childProps} />}
			</div>
		);
	}
}

export default withAuthenticator(App, { includeGreetings: true });
