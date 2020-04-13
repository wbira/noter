import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';

import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: ''
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);

      //this.props.history.push('/');
    } catch (e) {
      alert(e.message);

    }

    this.setState({ isLoading: false });
  };

  render() {
    return (
      <div className="Login">
        <Card>
          <Card.Body>
            <Card.Title>Login up</Card.Title>
            <Card.Text>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="email" bsSize="large">
                  <Form.Label>Email</Form.Label>
                  <Form.Control autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="password" bsSize="large">
                  <Form.Label>Password</Form.Label>
                  <Form.Control value={this.state.password} onChange={this.handleChange} type="password" />
                </Form.Group>
                <LoaderButton
                  block
                  bsSize="large"
                  disabled={!this.validateForm()}
                  type="submit"
                  isLoading={this.state.isLoading}
                  text="Login"
                  loadingText="Logging in…"
                />
              </Form>

            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
