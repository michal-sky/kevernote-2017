import React, { Component } from 'react';
import ActionBar from './ActionBar';
import NoteList from './NoteList';
import NoteView from './NoteView';

// import R from 'ramda';
import api from './api';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: null,
      selectedNote: null
    }

    this.notes = null;
    this.selectedNote = null;

    this.addNote = this.addNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.handleSelectedBodyChange = this.handleSelectedBodyChange.bind(this);
    this.handleSelectedTitleChange = this.handleSelectedTitleChange.bind(this);
    this.addNote = this.addNote.bind(this);

    this.updateNotes();
  }

  updateNotes() {
    api.notes.all().then(notes => this.setNotes(notes))
                   .then(() => this.enableNewNote());
  }

  setNotes(notes) {
    this.notes = notes;
    this.selectedNote = this.selectedNote || notes[0];

    this.setState({
      notes: notes,
      selectedNote: this.selectedNote
    })
  }

  selectNote(note) {
    this.selectedNote = note;

    this.setState({
      selectedNote: this.selectedNote
    });
  }

  selectNoteById(id) {
    this.selectedNote = this. notes.find((note) => note.id === id);

    this.setState({
      selectedNote: this.selectedNote
    });
  }

  handleSelectedBodyChange(event) {
    this.selectedNote.body =  event.target.value;
    this.setState({
      selectedNote: this.selectedNote
    });
    api.notes.update(this.selectedNote.id, this.selectedNote);
  }

  handleSelectedTitleChange(event) {
    this.selectedNote.title = event.target.value;
    this.setState({
      selectedNote: this.selectedNote
    });
    api.notes.update(this.selectedNote.id, this.selectedNote);
  }

  addNote() {
    const ids = this.notes.map((note) => note.id);
    const newId = Math.max(...ids) + 1;

    const newNote = {
        id: newId,
        title: 'New note',
        body: 'Write your note here',
        time: 'FOO BAR'
    };

    api.notes.create(newNote).then(() => this.updateNotes())
                             .then(() => this.selectNoteById(newId));
  }

  enableNewNote() {
    console.log("enable!");
  }

  render() {
    return (
      <div>
        <ActionBar addNote={this.addNote} />
        <NoteList notes={this.state.notes}
                  selectedNote={this.state.selectedNote}
                  selectNote={this.selectNote} />
        <NoteView note={this.state.selectedNote}
                  handleSelectedTitleChange={this.handleSelectedTitleChange}
                  handleSelectedBodyChange={this.handleSelectedBodyChange} />
      </div>
    );
  }
}
