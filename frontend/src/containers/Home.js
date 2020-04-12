import React, { Component } from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import { API, Auth } from 'aws-amplify';
import './Home.css';



export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentNote: '',
			currentNoteExpirationDays: '',
			isLoading: true,
			selectedNote: undefined,
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
				note: this.state.currentNote,
				expirationDays: this.state.currentNoteExpirationDays
			}
		}
		return API.post('noterCatalogApi', '/note', data).then((newNote) => this.setState({ notes: [...this.state.notes, newNote], currentNote: '', currentNoteExpirationDays: '' }));
	}

	getNotes() {
		return API.get('noterCatalogApi', '/note');
	}

	shareNote() {
		const email = this.state.sharingEmail
		const payload = {
			body: { email, note: this.state.selectedNote }
		}
		API.post('noterCatalogApi', '/note/share', payload).then(() => this.setState({ selectedNote: undefined }))

	}

	showModal(note) {
		return function () {
			this.setState({ selectedNote: note })
		}
	}

	renderNotes({ notes }) {
		return (
			<ul>
				{notes.length > 0 && notes.map(({ sortKey, note }) => <li key={sortKey}>{note}<button onClick={this.showModal(note).bind(this)}>Share note</button></li>)}
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
		this.setState({ currentNote: event.target.value })
	}

	updateCurrentNoteExpirationDate(event) {
		this.setState({ currentNoteExpirationDays: event.target.value })
	}

	updateSharingEmail(event) {
		this.setState({ sharingEmail: event.target.value })
	}

	renderNotePanel() {
		return (
			<div className="test">
				<PageHeader>Test API call</PageHeader>
				<div>
					<textarea value={this.state.currentNote} onChange={this.updateCurrentNote.bind(this)} />
					<input value={this.state.currentNoteExpirationDays} onChange={this.updateCurrentNoteExpirationDate.bind(this)} />
					<button onClick={this.postNotes.bind(this)}>Add new note</button>
				</div>
				{this.state.selectedNote &&
					<div>
						<input value={this.state.sharingEmail} onChange={this.updateSharingEmail.bind(this)} />
						<button onClick={this.shareNote.bind(this)}>Share with</button>
					</div>
				}
				<ListGroup>{!this.state.isLoading && this.renderNotes(this.state)}</ListGroup>
			</div>
		);
	}

	render() {
		return <div className="Home">{this.props.isAuthenticated ? this.renderNotePanel() : this.renderUnauthorized()}</div>;
	}
}
