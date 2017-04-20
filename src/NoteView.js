import React from 'react';

export default function NoteView(props) {
  const {
      note,
      handleSelectedTitleChange,
      handleSelectedBodyChange,
      deleteSelectedNote,
      persistenceStatus
  } = props;

  const title = note ? note.title : "Loading..";
  const body = note ? note.body : "Loading..";

  return (
    <article className="note-view">
      <nav className="note-view__actions">
        <button className="note-view__actions__trash"
                onClick={(deleteSelectedNote)} />
        <span className="note-view__actions__status">
          {persistenceStatus}
        </span>
      </nav>
      <input className="note-view__title"
             value={title}
             onChange={handleSelectedTitleChange} />
      <textarea className="note-view__body"
                value={body}
                onChange={handleSelectedBodyChange} />
    </article>
  );
}
