import React, { Component } from 'react';

export default class NotePreview extends Component {
  constructor (props) {
    super(props);
    this.state = props;
    this.data = {};
    this.selectNote = this.selectNote.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateData();
  }
  
  componentWillUpdate() {
    this.updateData();
  }
  
  updateData() {
    this.data = this.state.getNoteById(this.state.noteId);
  }
  
  selectNote() {
    this.state.select(this.state.noteId);
  }
  
  render () {
    return (
      <li className={"note-preview " + (this.state.getSelected() && this.state.noteId === this.state.getSelected().id ? " is-selected" : "")}>
        <a className="note-preview__link" href={"#notes/"+(this.data.id)} onClick={this.selectNote}>
          <span className="note-preview__time">{this.data.createdAt} Minutes Ago</span>
          <h2 className="note-preview__title">{this.data.title}</h2>
          <p className="note-preview__body">{this.data.body.length > 100 ? this.data.body.substr(0, 97) + '...' : this.data.body}</p>
        </a>
      </li>
    )
  }
}
