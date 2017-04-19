import React, { Component } from 'react';
// import R from 'ramda';
// import api from './api';

function NotePreview({note, selected_note, selectNote}) {
  let classes = "note-preview"
  if (note.id == selected_note) {
    classes += ' is-selected'
  }
  return (
      <li className={classes}>
        <a className="note-preview__link" onClick={()=> selectNote(note.id)}>
          <h2 className="note-preview__title">{note.title}</h2>
          <Text100 text={note.text}/>
        </a>
      </li>
  );
}

function NoteCount({notes}) {
  return (
        <div className="note-list__summary">
          <span>{notes.length}</span>
          <span> notes</span>
        </div>
  )
}

function Text100({text}) {
  if (text && text.length > 100) {
    text = text.substring(0, 97) + '...';
  }
  return(
      <p className="note-preview__body">{text}</p>
  );
}

export default class NoteList extends Component {

  componentDidMount() {
    // when mount
  }

  render() {
    return (
      <aside className="note-list">
        <h2 className="note-list__title">Notes</h2>
        <NoteCount notes={this.props.notes}/>
        <ul className="note-list__container">
          { this.props.notes.map(n => <NotePreview key={n.id} note={n} selected_note={ this.props.selected_note } selectNote={ this.props.selectNote }/>) }
        </ul>
      </aside>
    );
  }
}
