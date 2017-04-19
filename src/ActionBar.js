import React, { Component } from 'react';
// import R from 'ramda';
// import api from './api';

export default class ActionBar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // when mount
  }

  doSomething() {
    // sets some new state
    this.setState({ something: !this.state.something });
  }

  render() {
    return (
      <div className="action-bar">
        <div className="action-bar__logo"/>
        </div>
    );
  }
}
