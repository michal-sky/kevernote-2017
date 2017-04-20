import React from 'react';
import TimeAgo from 'react-timeago';

export default function NotePreview(props) {
  const {
    note,
    selectNote
  } = props;

  const {
    body,
    createdAt,
    title
  } = note;

  const abbreviatedBody = body && body.length > 100 ? (body.substr(0,97) + "...") : body;

  return (
    <a className="note-preview__link" onClick={() => selectNote(note)}>
      <TimeAgo className="note-preview__time" date={createdAt} />
      <h2 className="note-preview__title">{title}</h2>
      <p className="note-preview__body">{abbreviatedBody}</p>
    </a>
  );
}
