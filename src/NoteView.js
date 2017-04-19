import React from 'react';

export default function NoteView(props) {
  const {
      note,
      handleSelectedTitleChange,
      handleSelectedBodyChange
  } = props;

  return (
    <article className="note-view">
      <nav className="note-view__actions"></nav>
      <input className="note-view__title" value={(note && note.title) || "Loading.."} onChange={handleSelectedTitleChange}></input>
      <textarea className="note-view__body" value={(note && note.body) || "Loading.."} onChange={handleSelectedBodyChange}></textarea>
    </article>
  );
}
