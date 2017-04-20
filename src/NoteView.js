import React from 'react';

export default function NoteView(props) {
  const {
      note,
      handleSelectedTitleChange,
      handleSelectedBodyChange,
      deleteSelected,
      changesPending
  } = props;

  const changesPendingText = note ? (changesPending ? "Editing" : "Saved") : null;

  return (
    <article className="note-view">
      <nav className="note-view__actions">
        <button className="note-view__actions__trash" onClick={(deleteSelected)}></button>
        <span className="note-view__actions__status">{changesPendingText}</span>
      </nav>
      <input className="note-view__title" value={(note && note.title) || "Loading.."} onChange={handleSelectedTitleChange}></input>
      <textarea className="note-view__body" value={(note && note.body) || "Loading.."} onChange={handleSelectedBodyChange}></textarea>
    </article>
  );
}
