import React, { Component, Fragment } from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';

import './Signup.css';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: '',
      confirmPassword: '',
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
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
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });

      this.setState({
        newUser
      });

      await Auth.signIn(this.state.email, this.state.password);

      this.props.userHasAuthenticated(true);
      //this.props.history.push('/');
    } catch (e) {
      alert(e.message);
    }

    this.setState({ isLoading: false });
  };

  renderForm() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Sign up</Card.Title>

          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control value={this.state.password} onChange={this.handleChange} type="password" />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control value={this.state.confirmPassword} onChange={this.handleChange} type="password" />
            </Form.Group>
            <LoaderButton
              block
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Signup"
              loadingText="Signing up…"
            />
          </Form>

        </Card.Body>
      </Card >

    );
  }

  render() {
    return (
      <div className="Signup">{this.renderForm()}</div>
    );
  }
}