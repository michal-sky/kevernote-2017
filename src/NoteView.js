import React from 'react';

export default function NoteView(props) {
  const {
      note,
      handleSelectedTitleChange,
      handleSelectedBodyChange,
      deleteSelectedNote,
      persistenceStatus
  } = props;

  return (
    <article className="note-view">
      <nav className="note-view__actions">
        <button className="note-view__actions__trash" onClick={(deleteSelectedNote)}></button>
        <span className="note-view__actions__status">{persistenceStatus}</span>
      </nav>
      <input className="note-view__title" value={(note && note.title) || "Loading.."} onChange={handleSelectedTitleChange}></input>
      <textarea className="note-view__body" value={(note && note.body) || "Loading.."} onChange={handleSelectedBodyChange}></textarea>
    </article>
  );
}
