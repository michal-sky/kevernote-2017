import React, { Component } from 'react';
import ActionBar from './ActionBar.js';
import NoteList from './NoteList.js';
import NoteView from './NoteView.js';

// import R from 'ramda';
// import api from './api';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_note: 0,
      notes: [{title: 'example', text: 'I am a note', id: 0}, {title: 'note2', text: '1234567890 12345678901234567890123 45678901234567 890123456789012345 67890123456789 0123456789012345 678901234567890', id:1}]
    };

    this.selectNote = this.selectNote.bind(this);
    this.setNoteTitle = this.setNoteTitle.bind(this);
    this.setNoteText = this.setNoteText.bind(this);
  }

  componentDidMount() {
    // when mount
  }

  selectNote(id) {
    this.setState({ selected_note: id });
  }

  setNoteText(id, text) {
    let new_notes = this.state.notes.map(n => {
      if (n.id === id) {
        return {title: n.title, id: n.id, text: text};
      }else {
        return n;
      }
    });
    this.setState({ notes: new_notes });
  }
  setNoteTitle(id, title) {
    let new_notes = this.state.notes.map(n => {
      if (n.id === id) {
        return {title: title, id: n.id, text: n.text};
      }else {
        return n;
      }
    });
    this.setState({ notes: new_notes });
  }

  render() {
    return (
      <div>
        <ActionBar notes={ this.state.notes } selectNote={ this.selectNote }/>
        <NoteList notes={ this.state.notes } selected_note={ this.state.selected_note } selectNote={ this.selectNote } />
        <NoteView note={ this.state.notes.filter(note => note.id === this.state.selected_note)[0]} setNoteTitle={ this.setNoteTitle } setNoteText={ this.setNoteText } />
      </div>
    );
  }
}
