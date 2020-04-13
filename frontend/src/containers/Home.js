import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import { API } from 'aws-amplify';
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


	async componentDidMount() {
		debugger
		const auth = this.props.isAuthenticated
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

	openNoteDetails(sortKey) {
		alert(sortKey)

	}

	renderNotes({ notes }) {
		return (
			<ListGroup>
				{notes.length > 0 && notes.map(({ sortKey, note }) => <ListGroup.Item className="item" key={sortKey}><div className="noteText" onClick={this.openNoteDetails.bind(this, sortKey)}>{note}</div><Button variant="light" className="listButton" onClick={this.showModal(note).bind(this)}>Share note</Button></ListGroup.Item>)}
			</ListGroup>)
	}

	renderUnauthorized() {
		console.log("Props", this.props)
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

	handleClose() {
		this.setState({ selectedNote: undefined })
	}

	renderNotePanel() {
		return (
			<div className="test">
				<Form>
					<Form.Group>
						<Form.Label>New note</Form.Label>
						<Form.Control as="textarea" className="note" rows="3" value={this.state.currentNote} onChange={this.updateCurrentNote.bind(this)} />
						<Form.Control type="number" placeholder="Days to expire" value={this.state.currentNoteExpirationDays} onChange={this.updateCurrentNoteExpirationDate.bind(this)} />
						<div className="button-container">
							<Button variant="secondary" className="formButton" onClick={this.postNotes.bind(this)}>Add new note</Button>
						</div>
					</Form.Group>

				</Form>
				<Modal show={this.state.selectedNote} onHide={this.handleClose.bind(this)}>
					<Modal.Header closeButton>
						<Modal.Title>Share your note</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>Share your note</Form.Label>
								<Form.Control type="email" placeholder="e-mail" value={this.state.sharingEmail} onChange={this.updateSharingEmail.bind(this)} />
								<div className="button-container">

								</div>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="light" onClick={this.handleClose.bind(this)}>
							Close
          	</Button>
						<Button variant="secondary" className="formButton" onClick={this.shareNote.bind(this)}>Share</Button>
					</Modal.Footer>
				</Modal>

				{!this.state.isLoading ? this.renderNotes(this.state) : <div className="spinnerContainer"><Spinner animation="grow" variant="primary" /></div>}
			</div>
		);
	}

	render() {
		return <div className="Home">{this.props.isAuthenticated ? this.renderNotePanel() : this.renderUnauthorized()}</div>;
	}
}
