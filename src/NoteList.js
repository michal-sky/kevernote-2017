import React from 'react';
import NotePreview from './NotePreview';

export default function NoteList(props){
  const {
      notes,
      selectedNote,
      selectNote
  } = props;

  var createNotePreview = function(note) {
    const isSelected = selectedNote && note.id === selectedNote.id;
    const className = isSelected ? "note-preview is-selected" : "note-preview";

    return <li className={className} key={note.id}>
      <NotePreview note={note} selectNote={selectNote}/>
    </li>;
  }

  const noteItems = notes && notes.map((note) => createNotePreview(note));

  const noteCount = (notes && notes.length) || 0;

  return (
    <aside className="note-list">
      <h2 className="note-list__title">Notes</h2>
      <div className="note-list__summary">
        <span>{noteCount}</span>
        <span> </span>
        <span>notes</span>
      </div>
      <ul className="note-list__container">
        {noteItems}
      </ul>
    </aside>
  );
}
