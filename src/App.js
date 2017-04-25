import React from 'react';
import ActionBar from './ActionBar';
import NoteList from './NoteList';
import NoteView from './NoteView';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      note: {},
      notes: []
    };
    
    this.updateNoteValue = this.updateNoteValue.bind(this);
    this.addNote = this.addNote.bind(this);
    this.setActiveNote = this.setActiveNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }
  
  setActiveNote (e) {
      let target = e.target;
      while (target.tagName !== 'A') {
          target = target.parentNode;
      }
      
      let id = + target.getAttribute('data-key'); 
      this.setState({note: this.state.notes.find(note => note.id === id)})
  }
  
  componentDidMount() {
      // fixture notes
      let notes = [];
      
      notes.push({
          id: 1,
          title: "title",
          body: "body",
          createdAt: new Date("2017-04-22 14:00:00")
      });
      
      notes.push({
          id: 2,
          title: "title2",
          body: "body2",
          createdAt: new Date("2017-04-24 15:00:00")
      });
      
      notes.push({
          id: 3,
          title: "title san",
          body: "body xxx",
          createdAt: new Date("2017-04-24 15:45:00")
      });
      
      notes.push({
          id: 4,
          title: "title san",
          body: "body xxx",
          createdAt: new Date()
      });
      
      this.setState({notes: notes, note: notes.length ? notes[0] : null});
  }
  
  componentWillUnmount() {
    this.setState({notes: [], note: {}})
  }
  
  addNote() {
      let note = {
          id: this.state.notes.length + 1,
          title: "new title",
          body: "empty body",
          createdAt: new Date()
      };
      
      this.setState({note: note, notes: [note, ...this.state.notes]});
  }
  
  updateNoteValue(el) {
      let note = this.state.note;
      
      note[el.name] = el.value;
      
      this.setState({note: note});
  }
  
  removeNote (id) {
      this.setState((oldState) => ({note: {}, notes: this.state.notes.filter(note => note.id !== id)}));
  }
  
  render() {
    return (
      <div className="app-container">
        <ActionBar addNote={this.addNote}></ActionBar>
        <NoteList activeNote={this.state.note.id} setActiveNote={this.setActiveNote} notes={this.state.notes}></NoteList>
        <NoteView removeNote={this.removeNote} editing={false} note={this.state.note} updateEvent={this.updateNoteValue}></NoteView>
      </div>
    );
  }
}
