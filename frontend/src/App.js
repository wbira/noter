import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Auth } from 'aws-amplify';
import Home from './containers/Home'

import './App.css';
import Signup from './containers/Signup';
import Login from './containers/Login';

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
			const session = await Auth.currentSession()
			if (session) {
				console.log('App did mount and has session', session)
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

	handleLogout = async event => {
		await Auth.signOut();

		this.userHasAuthenticated(false);
		//this.props.history.push('/login');
	};


	render() {
		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated
		};
		return (
			<div className="App container">
				<Button onClick={this.handleLogout.bind(this)}>Logout</Button>
				<Signup {...childProps} />
				<Login {...childProps} />
				{this.state.isAuthenticated && <Home {...childProps} />}
			</div>

		);
	}
}
export default App;
//export default withAuthenticator(App, { includeGreetings: true });
