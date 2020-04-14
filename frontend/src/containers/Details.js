import React, { Component } from 'react';
import { API } from 'aws-amplify';
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import './Details.css'



function NoteDetails(item) {
  const { note, shared, hashKey, expirationTime } = item
  return (
    <Card className="noteDetails">
      {shared && <Badge variant="success">Shared note</Badge>}
      <Card.Text>{note}</Card.Text>
      <Card.Text>Author: {hashKey}</Card.Text>
      {expirationTime && <Card.Text>Note expiration date: {expirationTime}</Card.Text>}

    </Card>)
}

export default class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      isLoading: true,
      errorMessage: ''
    }
  }

  async componentDidMount() {
    const { noteId } = this.props.match.params;
    if (noteId) {
      try {
        const item = await this.getNote(noteId)
        this.setState({ item, isLoading: false })
      } catch (e) {
        this.setState({ errorMessage: e.Message })
      }

    } else {
      const errorMessage = "Can't fetch note details, please try again later."
      this.setState({ errorMessage })
    }
  }

  getNote(noteId) {
    return API.get('noterCatalogApi', `/note/details/${noteId}`);
  }

  render() {
    return (
      <div className="Details">
        {this.state.isLoading && <div className="spinnerContainer"><Spinner animation="grow" variant="primary" /></div>}
        {!this.state.isLoading && <NoteDetails  {...this.state.item} />}
        <Alert variant="danger" show={this.state.errorMessage}>
          <p dangerouslySetInnerHTML={{ __html: this.state.errorMessage }} />
        </Alert>
      </div>)
  }
}
