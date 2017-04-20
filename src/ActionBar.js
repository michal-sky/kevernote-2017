import React, { Component } from 'react';
// import R from 'ramda';
// import api from './api';

export default class ActionBar extends Component {

  componentDidMount() {
    // when mount
  }

  addNewNote(notes, selectNote) {
    let new_note_id = Math.floor(Math.random() * 1000000);
    notes = [{title: 'New note', text: 'Write your note here', id: new_note_id}, ...notes];
    selectNote(new_note_id);
  }

  render() {
    return (
      <nav className="action-bar">
        <div className="action-bar__logo"/>
        <button className="action-bar__new" onClick={() => this.addNewNote(this.props.notes, this.props.selectNote) }>+</button>
      </nav>
    );
  }
}
