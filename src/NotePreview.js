import React from 'react';

export default function NotePreview(props) {
  const {
    note,
    selectNote
  } = props;

  const {
    body,
    link,
    time,
    title
  } = note;

  // TODO: abbreviated body
  return (
    <a className="note-preview__link" href={link} onClick={() => selectNote(note)}>
      <span className="note-preview__time">{time}</span>
      <h2 className="note-preview__title">{title}</h2>
      <p className="note-preview__body">{body}</p>
    </a>
  );
}
