import React, { Component } from 'react';
// import R from 'ramda';
// import api from './api';

export default class NoteView extends Component {
  componentDidMount() {
    // when mount
  }

  doSomething() {
    // sets some new state
  }

  render() {
    return (
      <article className="note-view">
        <nav className="note-view__actions"></nav>
        <input className="note-view__title" value={this.props.note.title} onChange={(event) => this.props.setNoteTitle(this.props.note.id, event.target.value)}/>
        <textarea className="note-view__body" value={this.props.note.text} onChange={(event) => this.props.setNoteText(this.props.note.id, event.target.value)}/>
      </article>
    );
  }
}
