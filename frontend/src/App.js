import React, { Component } from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import NavItem from 'react-bootstrap/NavItem'
import Routes from './Routes';
import { Auth } from 'aws-amplify';

import './App.css';
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: false,
			isAuthenticating: true,
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
			userHasAuthenticated: this.userHasAuthenticated,
			...this.props
		};
		return (
			<div className="App container">
				<Navbar>
					<Navbar.Brand>
						<Link to="/">Noter</Link>
					</Navbar.Brand>
					{this.state.isAuthenticated && (
						<NavItem ><Button onClick={this.handleLogout}>Logout</Button></NavItem>
					)}


				</Navbar>


				{/* {
					!this.state.isAuthenticated &&
					<div className="authContainer">
						<Signup className="authForm" {...childProps} />
						<Login className="authForm" {...childProps} />
					</div>
				} */}
				{!this.state.isAuthenticating &&
					<Routes childProps={childProps} />}
			</div >

		);
	}
}
export default withRouter(App);

