import React, { Component } from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import { API, Auth } from 'aws-amplify';
import './Home.css';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentNote: '',
			isLoading: true,
			notes: []
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
				const { notes } = await this.getNotes();
				this.setState({ notes });
			} catch (e) {
				console.log(e);
			}

			this.setState({ isLoading: false });
		}
	}

	postNotes() {
		const data = {
			body: {
				note: this.state.currentNote
			}
		}
		return API.post('noterCatalogApi', '/note', data).then((newNote) => this.setState({ notes: [...this.state.notes, newNote], currentNote: '' }));
	}

	getNotes() {
		return API.get('noterCatalogApi', '/note');
	}

	shareNote(note) {
		return function () {
			const email = "tokyotesthotel@mail.com"
			const payload = {
				body: { email, note }
			}
			API.post('noterCatalogApi', '/note/share', payload)
		}
	}

	renderNotes({ notes }) {
		console.log(notes);
		return (
			<ul>
				{notes.length > 0 && notes.map(({ sortKey, note }) => <li key={sortKey}>{note}<button onClick={this.shareNote(note)}>Share note</button></li>)}
			</ul>)
	}

	renderUnauthorized() {
		return (
			<div className="lander">
				<h1>Unauthorized</h1>
			</div>
		);
	}

	updateCurrentNote(event) {
		console.log(event)
		this.setState({ currentNote: event.target.value })
	}

	renderNotePanel() {
		return (
			<div className="test">
				<PageHeader>Test API call</PageHeader>
				<div>
					<textarea value={this.state.currentNote} onChange={this.updateCurrentNote.bind(this)} />
					<button onClick={this.postNotes.bind(this)}>Add new note</button>
				</div>
				<ListGroup>{!this.state.isLoading && this.renderNotes(this.state)}</ListGroup>
			</div>
		);
	}

	render() {
		return <div className="Home">{this.props.isAuthenticated ? this.renderNotePanel() : this.renderUnauthorized()}</div>;
	}
}
