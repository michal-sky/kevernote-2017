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
    this.newNoteEnabled = false;

    this.addNote = this.addNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.handleSelectedBodyChange = this.handleSelectedBodyChange.bind(this);
    this.handleSelectedTitleChange = this.handleSelectedTitleChange.bind(this);
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);

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

  clearSelection() {
    this.selectedNote = null;

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

    this.clearSelection();
    this.disableNewNote();
    api.notes.create(newNote).then(() => this.updateNotes());
  }

  disableNewNote() {
    this.newNoteEnabled = false;
  }

  enableNewNote() {
    this.newNoteEnabled = true;
  }

  deleteNote(note) {
    this.clearSelection();
    api.notes.delete(note.id).then(() => this.updateNotes());
  }

  render() {
    return (
      <div>
        <ActionBar addNote={this.addNote}
                   addNoteEnabled={this.newNoteEnabled}/>
        <NoteList notes={this.state.notes}
                  selectedNote={this.state.selectedNote}
                  selectNote={this.selectNote} />
        <NoteView note={this.state.selectedNote}
                  handleSelectedTitleChange={this.handleSelectedTitleChange}
                  handleSelectedBodyChange={this.handleSelectedBodyChange}
                  deleteNote={this.deleteNote} />
      </div>
    );
  }
}
