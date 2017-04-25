import React, {Component} from 'react';

export default class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {...props, savingState: "Saved"};
        this.data = {};
        this.setTimeout = null;
        this.updateData = this.updateData.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.doSaveTitle = this.doSaveTitle.bind(this);
        this.doSaveBody = this.doSaveBody.bind(this);
        this.getNote = this.getNote.bind(this);
        this.delete = this.delete.bind(this);
        this.savedCallback = this.savedCallback.bind(this);
        this.setSavingState = this.setSavingState.bind(this);
        this.updateData();
    }

    updateData() {
        this.getNote()
    }

    componentWillUpdate() {
        this.updateData();
    }

    doSaveTitle(event) {
        this.updateNote('title', event.target.value);
    }

    doSaveBody(event) {
        this.updateNote('body', event.target.value);
    }

    updateNote(field, value) {
        this.setSavingState("Editing");
        this.state.updateNote(this.state.getSelected().id, field, value);
        if (this.setTimeout!==null) {
            clearTimeout(this.setTimeout);
        }
        this.setTimeout = setTimeout(function () {
            this.setSavingState("Saving");
            this.state.persistNote(this.state.getSelected().id, this.savedCallback);
        }.bind(this), 3000);
    }


    savedCallback() {
        this.setSavingState("Saved");
    }

    setSavingState(savingState) {
        this.setState(oldState => {return {...oldState, savingState: savingState}});
    }

    getNote() {
        return this.state.getNote(this.state.getSelected().id);
    }

    delete() {
        this.state.removeNote(this.state.getSelected().id);
    }

    render() {
        return <article className="note-view">
            <nav className="note-view__actions">
                <button className="note-view__actions__trash" onClick={this.delete}></button>
                <span className="note-view__actions__status">{this.state.savingState}</span>
            </nav>
            <input className="note-view__title" value={this.getNote().title} onChange={this.doSaveTitle}/>
            <textarea className="note-view__body" value={this.getNote().body} onChange={this.doSaveBody}/>
        </article>
    }
}