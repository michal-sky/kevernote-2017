import React, { Component } from 'react';
import ActionBar from './ActionBar';
import NoteList from './NoteList';
import NoteView from './NoteView';

import api from './api';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addNoteEnabled: false,
      notes: [],
      selectedNote: null,
      persistenceStatus: null
    }

    this.addNote = this.addNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.handleSelectedBodyChange = this.handleSelectedBodyChange.bind(this);
    this.handleSelectedTitleChange = this.handleSelectedTitleChange.bind(this);
    this.deleteSelectedNote = this.deleteSelectedNote.bind(this);
    this.updateSelectedNote = this.updateSelectedNote.bind(this);

    this.updateNotes();
    this.resetPersistenceTimeout();
  }

  updateNotes() {
    api.notes.all().then(notes => this.setNotes(notes))
                   .then(() => this.resetSelectedNote())
                   .then(() => this.enableNewNote());
  }

  setNotes(notes) {
    this.setState({
      notes: notes
    })
  }

  selectNote(note) {
    this.setState({
      selectedNote: note
    });
  }

  resetSelectedNote() {
    this.setState({
      selectedNote: this.state.selectedNote || this.state.notes[0]
    })
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

    this.selectNote(null);
    this.disableNewNote();
    api.notes.create(newNote)
             .then(() => this.updateNotes());
  }

  deleteSelectedNote() {
    const selectedNote = this.state.selectedNote;

    if (!selectedNote) {
      return;
    }

    this.selectNote(null);
    this.disableNewNote();
    api.notes.delete(selectedNote.id)
             .then(() => this.updateNotes());
  }

  updateSelectedNote() {
    const selectedNote = this.state.selectedNote;

    if (!selectedNote) {
      return;
    }

    this.setPersistenceStatus("Saving");
    api.notes.update(selectedNote.id, selectedNote)
             .then(() => this.setPersistenceStatus("Saved"));
  }

  setPersistenceStatus(status) {
    this.setState({
      persistenceStatus: status
    })
  }

  resetPersistenceTimeout() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(this.updateSelectedNote, 2000);
  }

  handleSelectedBodyChange(event) {
    const selectedNote = this.state.selectedNote;
    selectedNote.body =  event.target.value;

    this.handleSelectedChange(selectedNote);
  }

  handleSelectedTitleChange(event) {
    const selectedNote = this.state.selectedNote;
    selectedNote.title = event.target.value;

    this.handleSelectedChange(selectedNote);
  }

  handleSelectedChange(newSelected) {
    this.setState({
      selectedNote: newSelected,
      persistenceStatus: "Editing"
    });

    this.resetPersistenceTimeout();
  }

  disableNewNote() {
    this.setState({
      addNoteEnabled: false
    })
  }

  enableNewNote() {
    this.setState({
      addNoteEnabled: true
    })
  }

  render() {
    return (
      <div>
        <ActionBar addNote={this.addNote}
                   addNoteEnabled={this.state.addNoteEnabled} />
        <NoteList notes={this.state.notes}
                  selectedNote={this.state.selectedNote}
                  selectNote={this.selectNote} />
        <NoteView note={this.state.selectedNote}
                  handleSelectedTitleChange={this.handleSelectedTitleChange}
                  handleSelectedBodyChange={this.handleSelectedBodyChange}
                  deleteSelectedNote={this.deleteSelectedNote}
                  persistenceStatus={this.state.persistenceStatus} />
      </div>
    );
  }
}
