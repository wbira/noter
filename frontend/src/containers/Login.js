import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';
import { validateEmail } from '../validators/email'
import { validatePassword } from '../validators/password'

import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: '',
      errorMessage: ''
    };
  }

  validateForm() {
    const validEmail = validateEmail(this.state.email)
    const validPassword = validatePassword(this.state.password)

    return { validEmail, validPassword }
  }



  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  prepareErrorMessage(validEmail, validPassword) {
    let message = ''
    if (!validEmail) {
      message += "Check your email <br/>"
    }

    if (!validPassword) {
      message += "Check your password"
    }

    return message
  }

  clearErrorMessage() {
    this.setState({ errorMessage: '' })
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { validEmail, validPassword } = this.validateForm()
    if (validEmail && validPassword) {
      this.setState({ errorMessage: '' })
      this.signIn()
    } else {
      const errorMessage = this.prepareErrorMessage(validEmail, validPassword)
      this.setState({ errorMessage })
    }

  };

  async signIn() {
    this.setState({ isLoading: true });

    try {
      await Auth.signIn(this.state.email, this.state.password);

      this.props.userHasAuthenticated(true);

      let { from } = this.props.location.state || { from: { pathname: "/" } };
      this.props.history.replace(from)
    } catch (e) {
      this.setState({ errorMessage: e.message })
    }

    this.setState({ isLoading: false });

  }

  render() {
    return (
      <div className="Login">
        <Card>
          <Card.Body>
            <Card.Title>Login up</Card.Title>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control value={this.state.password} onChange={this.handleChange} type="password" />
              </Form.Group>
              <LoaderButton
                block
                type="submit"
                isLoading={this.state.isLoading}
                text="Login"
                loadingText="Logging in…"
              />
            </Form>


          </Card.Body>
        </Card>
        <Alert variant="danger" show={this.state.errorMessage} onClose={this.clearErrorMessage.bind(this)}>
          <p dangerouslySetInnerHTML={{ __html: this.state.errorMessage }} />
        </Alert>
      </div >
    );
  }
}
