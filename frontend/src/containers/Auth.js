import React, { Component, Fragment } from 'react';
import Signup from './Signup';
import Login from './Login';

export default class Auth extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="authContainer">
        <Signup className="authForm" {...this.props} />
        <Login className="authForm" {...this.props} />
      </div>)
  }
}