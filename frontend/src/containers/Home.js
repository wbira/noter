import React, { Component } from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import { API, Auth } from 'aws-amplify';
import './Home.css';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			noterCatalogApi: []
		};
	}

	async isAuth() {
		const result = await Auth.currentAuthenticatedUser().then(user => {
			console.log(user);
			return true;
		}).catch(e => {
			console.log(e);
			return false;
		});

		return result;
	}

	async componentDidMount() {
		const auth = await this.isAuth();
		if (!auth) {
			return;
		} else {
			try {
				const noterCatalogApi = await this.noterCatalogApi();
				this.setState({ noterCatalogApi });
			} catch (e) {
				console.log(e);
			}

			this.setState({ isLoading: false });
		}
	}

	noterCatalogApi() {
		return API.get('noterCatalogApi', '/note');
	}

	renderTestAPI(noterCatalogApi) {
		console.log(noterCatalogApi);
		return noterCatalogApi.message;
	}

	renderLander() {
		return (
			<div className="lander">
				<h1>Test web app</h1>
				<p>A simple react test app</p>
			</div>
		);
	}

	renderTest() {
		return (
			<div className="test">
				<PageHeader>Test API call</PageHeader>
				<ListGroup>{!this.state.isLoading && this.renderTestAPI(this.state.noterCatalogApi)}</ListGroup>
			</div>
		);
	}

	render() {
		return <div className="Home">{this.props.isAuthenticated ? this.renderTest() : this.renderLander()}</div>;
	}
}
