import React, { Component } from 'react';

export default class Note extends Component {
  constructor (props) {
    super(props);    
    this.state = props;
    this.data = {};
    this.updateData = this.updateData.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.updateField = this.updateField.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateData();
  }

  componentWillUpdate() {
    this.updateData();
  }

  updateData() {
    this.data = this.state.getSelected();
  }
  
  deleteNote() {
    this.state.deleteNote(this.data.id);
  }
  
  updateTitle(e) {
    this.updateField('title', e.target.value);
  }
  
  updateBody(e) {
    this.updateField('body', e.target.value);
  }
  
  updateField(field, value) {
    this.state.updateNote(this.data.id, field, value);
  }
  
  render () {
    return (
      <article className="note-view">
        <nav className="note-view__actions">
          <button className="note-view__actions__trash" onClick={this.deleteNote}/>
          <span className="note-view__actions__status">{this.state.getStatus()}</span>
        </nav>
        <input className="note-view__title" value={this.data.title} onChange={this.updateTitle} />
        <textarea className="note-view__body" value={this.data.body} onChange={this.updateBody} />
      </article>
    )
  }
}
