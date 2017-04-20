import React from 'react';

export default function ActionBar(props) {
  const {
      addNote,
      addNoteEnabled
  } = props;

  return (
    <nav className="action-bar">
      <div className="action-bar__logo" />
      <button className="action-bar__new"
              disabled={!addNoteEnabled}
              onClick={addNote}>
        +
      </button>
    </nav>
  );
}
