import React, { Component } from 'react';
import ActionBar from './ActionBar.js';
import NoteList from './NoteList.js';
import NoteView from './NoteView.js';

// import R from 'ramda';
import api from './api';

function getSelectedNote(notes, selectedNoteId) {
 if (selectedNoteId == null) {
   return{ title: '', text: '' };
 } else {
   return notes.filter(note => note.id === selectedNoteId)[0]
 }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      selected_note: null
    };

    this.selectNote = this.selectNote.bind(this);

    this.setNoteTitle = this.setNoteTitle.bind(this);
    this.setNoteText = this.setNoteText.bind(this);
    this.addNewNote = this.addNewNote.bind(this);
    this.getNotes = this.getNotes.bind(this);

    this.getNotes();
  }

  getNotes() {
    api.notes.all().then((notes) => {
      this.setState({
        notes: notes,
        selected_note:notes[0].id
      })
    })
  }

  componentDidMount() {
    // when mount
  }

  selectNote(id) {
    this.setState({ selected_note: id });
  }

  addNewNote() {
    let new_note_id = Math.floor(Math.random() * 1000000);
    let note = {title: 'New note', text: 'Write your note here', id: new_note_id}
    let new_notes = [note, ...this.state.notes];
    this.setState({ notes: new_notes, selected_note: new_note_id })

    api.notes.create(note)
  }

  setNoteText(id, text) {
    let new_notes = this.state.notes.map(n => {
      if (n.id === id) {
        let note = {title: n.title, id: n.id, text: text}
        api.notes.update(id, note)
        return note;
      }else {
        return n;
      }
    });

    this.setState({ notes: new_notes });
  }
  setNoteTitle(id, title) {
    let new_notes = this.state.notes.map(n => {
      if (n.id === id) {
        let note = {title: title, id: n.id, text: n.text};
        api.notes.update(id, note)
        return note;
      }else {
        return n;
      }
    });
    this.setState({ notes: new_notes });
  }

  render() {
    return (
      <div>
        <ActionBar notes={ this.state.notes } addNewNote={ this.addNewNote }/>
        <NoteList notes={ this.state.notes } selected_note={ this.state.selected_note } selectNote={ this.selectNote } />
        <NoteView note={ getSelectedNote(this.state.notes, this.state.selected_note)} setNoteTitle={ this.setNoteTitle } setNoteText={ this.setNoteText } />
      </div>
    );
  }
}
