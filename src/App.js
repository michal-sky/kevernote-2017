import React, { Component } from 'react';
// import R from 'ramda';
import api from './api';
import NotePreview from './components/NotePreview';
import Note from './components/Note';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      selected: null,
      status: 'Saved'
    };

    this.createNewNote = this.createNewNote.bind(this);
    this.setSelectedNote = this.setSelectedNote.bind(this);
    this.getSelectedNote = this.getSelectedNote.bind(this);
    this.getNoteById = this.getNoteById.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
    this.stageChanges = this.stageChanges.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.getStatus = this.getStatus.bind(this);
  }

  componentDidMount() {
    api.notes.all().then(notes => this.setState(oldState => { return {...oldState, notes: notes}}));
  }

  createNewNote() {
    let newId = this.state.notes.length + 1;
    let newNote = {
      id: newId,
      title: 'New Note',
      body: 'This is a new note',
      createdAt: 1234455667,
    };
    this.setState(oldState => {
      return {...oldState, notes: [newNote, ...this.state.notes], selected: newId}
    });
    
    api.notes.create(newNote);
  }
  
  setSelectedNote(id) {
    this.setState(oldState => {
      return {...oldState, selected: id}
    });
  }
  
  getSelectedNote() {
    return this.getNoteById(this.state.selected);
  }
  
  getNoteById(id) {
    return this.state.notes.find((note) => {
      return note.id === id;
    });
  }
  
  updateNote(id, field, value) {
    let note = this.getNoteById(id);
    let notes = this.state.notes;
    let notesIndex = this.state.notes.findIndex((note) => {
      return note.id === id;
    });
    
    note[field] = value;
    notes[notesIndex] = note;
    
    this.setState(oldState => {
      return {...oldState, notes: notes, status: 'Editing'}
    });
    
    this.stageChanges(id, note);
  }
  
  stageChanges(id, note) {
    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {this.commitChanges(id, note)}, 2000);
  }
  
  commitChanges(id, note) {
    this.setState(oldState => {
      return {...oldState, status: 'Saving...'};
    });
    
    api.notes.update(id, note).then(() => {
      this.setState(oldState => {
        return {...oldState, status: 'Saved'};
      });
    }).catch(() => {
      this.setState(oldState => {
        return {...oldState, status: 'Error'};
      });
    })
  }
  
  deleteNote(id) {
    let notes = this.state.notes.filter((note) => {
      return note.id !== id;
    });
    this.setState(oldState => {
      return {...oldState, notes: [...notes], selected: null};
    });
    
    api.notes.delete(id).then(result => alert(JSON.stringify(result)));
  }
  
  getStatus() {
    return this.state.status;
  }
  
  render() {
    return (
      <main className="app">
        <nav className="action-bar">
          <div className="action-bar__logo" />
          <button className="action-bar__new" onClick={this.createNewNote}>+</button>
        </nav>
        <aside className="note-list">
          <h2 className="note-list__title">Notes</h2>
          <div className="note-list__summary">
            <span>{this.state.notes.length}</span><span> </span><span>notes</span>
          </div>
          <ul className="note-list__container">
            {this.state.notes.map((note) => {
              return <NotePreview noteId={note.id} getSelected={this.getSelectedNote} 
                                  select={this.setSelectedNote} getNoteById={this.getNoteById} key={note.id} />
            })}
          </ul>
        </aside>
        {this.state.selected ?
          <Note selected={this.state.selected} getStatus={this.getStatus} 
                getSelected={this.getSelectedNote} updateNote={this.updateNote} deleteNote={this.deleteNote} />
          : ''
        }
      </main>
    );
  }
}
