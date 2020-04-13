import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';
import { validateEmail } from '../validators/email'
import { validatePassword, validateConfirmPassword } from '../validators/password'


import './Signup.css';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: '',
      confirmPassword: '',
      newUser: null,
      errorMessage: ''
    };
  }

  validateForm() {
    const validEmail = validateEmail(this.state.email)
    const validPassword = validatePassword(this.state.password)
    const validConfirmPassword = validateConfirmPassword(this.state.password, this.state.confirmPassword)

    return { validEmail, validPassword, validConfirmPassword }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  prepareErrorMessage(validEmail, validPassword, validConfirmPassword) {
    let message = ''
    if (!validEmail) {
      message += "Please add valid email address <br/>"
    }

    if (!validPassword) {
      message += "Password should have at least 8 chars <br/>"
    }

    if (!validConfirmPassword) {
      message += "Password and confirmed password are not equal"
    }


    return message
  }

  clearErrorMessage() {
    this.setState({ errorMessage: '' })
  }


  handleSubmit = async event => {
    event.preventDefault();

    const { validEmail, validPassword, validConfirmPassword } = this.validateForm()
    if (validEmail && validPassword && validateConfirmPassword) {
      this.setState({ errorMessage: '' })
      this.singUpAndSignIn()
    } else {
      const errorMessage = this.prepareErrorMessage(validEmail, validPassword, validConfirmPassword)
      this.setState({ errorMessage })
    }


  };

  async singUpAndSignIn() {
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
    } catch (e) {
      alert(e.message);
    }

    this.setState({ isLoading: false });
  }

  render() {
    return (
      <div className="Signup">
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
                type="submit"
                isLoading={this.state.isLoading}
                text="Signup"
                loadingText="Signing up…"
              />
            </Form>

          </Card.Body>
        </Card >
        <Alert variant="danger" show={this.state.errorMessage} onClose={this.clearErrorMessage.bind(this)}>
          <p dangerouslySetInnerHTML={{ __html: this.state.errorMessage }} />
        </Alert>
      </div>
    );
  }

}
