import React, { Component, Fragment } from 'react';

export default class Details extends Component {
  constructor(props) {
    super(props);
    console.log("det", props)
  }

  render() {

    return (
      <div>
        Details id {this.props.match.params && this.props.match.params.noteId}
      </div>)
  }
}