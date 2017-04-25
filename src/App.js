import React, {Component} from 'react';
// import R from 'ramda';
import api from './api';
import NotePreview from './NotePreview';
import Note from './Note';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            selected: null
            // sets some initial state
        };

        this.setSelected = this.setSelected.bind(this);
        this.getSelected = this.getSelected.bind(this);
        this.getNote = this.getNote.bind(this);
        this.addNote = this.addNote.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.persistNote = this.persistNote.bind(this);
        this.removeNote = this.removeNote.bind(this);

    }

    componentDidMount() {
        // when mount
        api.notes.all().then((notes) => this.setState({notes: notes}));
    }

    setSelected(id) {
        // sets some new state
        this.setState({selected: id})
    }

    getSelected() {
        return this.getNote(this.state.selected);
    }

    getNote(id) {
        return this.state.notes.find((note) => {
            return note.id === id;
        });
    }

    updateNote(id, field, value) {
        var note = this.getNote(id);
        note[field] = value;
        this.setState({...this.state});
    }

    persistNote(id, callback) {
        var note = this.getNote(id);
        api.notes.update(id, note).then(() =>
            callback()
        );

    }

    addNote() {
        let newId = this.state.notes.length + 1;
        let newNote = {
            id: newId,
            title: "add new things",
            body: "boooody",
            createdAt: new Date().getTime()
        };

        api.notes.create(newNote);
        this.setState({notes: [newNote, ...this.state.notes]});
        this.setSelected(newId);
    }


    removeNote(id) {
        var newData = this.state.notes.filter((note) => {
            return note.id !== id;
        });
        this.setState({notes: newData});
        this.setSelected(null);
        api.notes.delete(id);
    }

    render() {
        return (
            <main className="app">
                <nav className="action-bar">
                    <div className="action-bar__logo"/>
                    <button className="action-bar__new" onClick={this.addNote}>+</button>
                </nav>

                <aside className="note-list">
                    <h2 className="note-list__title"> Notes</h2>
                    <div className="note-list__summary"><span >{this.state.notes.length}</span>
                        <span> </span>
                        <span >notes</span>
                    </div>
                    <ul className="note-list__container">
                        {this.state.notes.map((note) => {
                                return <NotePreview noteId={note.id} key={note.id} setSelected={this.setSelected}
                                                    getSelected={this.getSelected} getNote={this.getNote}/>

                            }
                        )}
                    </ul>
                </aside>
                {this.state.selected ?
                    <Note selected={this.state.selected} getSelected={this.getSelected} getNote={this.getNote}
                          updateNote={this.updateNote} removeNote={this.removeNote}
                          persistNote={this.persistNote}/> : ''}

            </main>
        );
    }
}
