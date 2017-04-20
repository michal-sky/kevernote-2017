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
      selectedNote: null,
      newNoteEnabled: false,
      changesPending: false
    }

    this.addNote = this.addNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.handleSelectedBodyChange = this.handleSelectedBodyChange.bind(this);
    this.handleSelectedTitleChange = this.handleSelectedTitleChange.bind(this);
    this.addNote = this.addNote.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);

    this.updateNotes();
  }

  updateNotes() {
    api.notes.all().then(notes => this.setNotes(notes))
                   .then(() => this.enableNewNote());
  }

  setNotes(notes) {
    const selectedNote = this.state.selectedNote || notes[0];

    this.setState({
      notes: notes,
      selectedNote: selectedNote
    })
  }

  selectNote(note) {
    this.setState({
      selectedNote: note
    });
  }

  clearSelection() {
    this.setState({
      selectedNote: null
    });
  }

  handleSelectedBodyChange(event) {
    const selectedNote = this.state.selectedNote;
    selectedNote.body =  event.target.value;

    this.setState({
      selectedNote: selectedNote,
      changesPending: true
    });
    api.notes.update(selectedNote.id, selectedNote);
  }

  handleSelectedTitleChange(event) {
    const selectedNote = this.state.selectedNote;
    selectedNote.title = event.target.value;

    this.setState({
      selectedNote: selectedNote,
      changesPending: true
    });
    api.notes.update(selectedNote.id, selectedNote);
  }

  addNote() {
    const ids = this.state.notes.map((note) => note.id);
    const newId = Math.max(...ids) + 1;

    const newNote = {
        id: newId,
        title: 'New note',
        body: 'Write your note here',
        createdAt: new Date().getTime()
    };

    this.clearSelection();
    this.disableNewNote();
    api.notes.create(newNote).then(() => this.updateNotes());
  }

  disableNewNote() {
    this.setState({
      newNoteEnabled: false
    })
  }

  enableNewNote() {
    this.setState({
      newNoteEnabled: true
    })
  }

  deleteSelected() {
    const selectedNote = this.state.selectedNote;

    if (!selectedNote) {
      return;
    }

    this.clearSelection();
    api.notes.delete(selectedNote.id).then(() => this.updateNotes());
  }

  render() {
    return (
      <div>
        <ActionBar addNote={this.addNote}
                   addNoteEnabled={this.state.newNoteEnabled} />
        <NoteList notes={this.state.notes}
                  selectedNote={this.state.selectedNote}
                  selectNote={this.selectNote} />
        <NoteView note={this.state.selectedNote}
                  handleSelectedTitleChange={this.handleSelectedTitleChange}
                  handleSelectedBodyChange={this.handleSelectedBodyChange}
                  deleteSelected={this.deleteSelected}
                  changesPending={this.state.changesPending} />
      </div>
    );
  }
}
