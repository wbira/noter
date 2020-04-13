import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavItem from 'react-bootstrap/NavItem'

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
				<Navbar>
					<Navbar.Brand>
						<Link to="/">Noter</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse>
						<Nav>
							{this.state.isAuthenticated && (
								<NavItem onClick={this.handleLogout}>Logout</NavItem>
							)}
						</Nav>
					</Navbar.Collapse>

				</Navbar>


				{!this.state.isAuthenticated &&
					<div className="authContainer">
						<Signup className="authForm" {...childProps} />
						<Login className="authForm" {...childProps} />
					</div>}
				{this.state.isAuthenticated && <Home {...childProps} />}
			</div>

		);
	}
}
export default withRouter(App);

