import React from 'react';

export default function ActionBar(props) {
  const {
      addNote
  } = props;

  return (
    <nav className="action-bar">
      <div className="action-bar__logo" />
      <button className="action-bar__new" onClick={addNote}>+</button>
    </nav>
  );
}
