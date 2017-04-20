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

  resetPersistenceTimeout() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(this.updateSelectedNote, 2000);
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
      persistenceStatus: "Editing"
    });

    this.resetPersistenceTimeout();
  }

  handleSelectedTitleChange(event) {
    const selectedNote = this.state.selectedNote;
    selectedNote.title = event.target.value;

    this.setState({
      selectedNote: selectedNote,
      persistenceStatus: "Editing"
    });

    this.resetPersistenceTimeout();
  }

  updateSelectedNote() {
    const selectedNote = this.state.selectedNote;

    this.setState({
      persistenceStatus: "Saving"
    })

    api.notes.update(selectedNote.id, selectedNote).then(() =>
      this.setState({
        persistenceStatus: "Saved"
      })
    );
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
      addNoteEnabled: false
    })
  }

  enableNewNote() {
    this.setState({
      addNoteEnabled: true
    })
  }

  deleteSelectedNote() {
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
