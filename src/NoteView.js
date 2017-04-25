/**
 * Created by markus.michalsky on 24.04.2017.
 */

import React, {Component} from "react";

export default class NoteView extends Component {
    constructor (props) {
        super(props);
        this.state = {
            editing: false
        };
        
        this.timeout = null;
        this.element = null;
        this.waitForUpdate = this.waitForUpdate.bind(this);
        this.removeNote = this.removeNote.bind(this);
    }
    
    waitForUpdate (event) {
        this.setState({editing: true});
        
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        this.props.updateEvent(event.target);
        
        this.timeout = setTimeout(this.toggleUpdate.bind(this), 3000);
    }
    
    toggleUpdate () {
        // this would trigger parent update call to api
        this.timeout = null;
        this.setState({editing: false});
    }
    
    select (event) {
        event.target.select();
    }
    
    removeNote() {
        this.props.removeNote(this.props.note.id);
    }
    
    render() {
        if (!this.props.note || !this.props.note.id) {
            return (
                <div className="note-view" />
            );
        }
        
        return (
            <div className="note-view">
                <div className="note-view__actions">
                    <div className="note-view__actions__status">{this.state.editing ? "EDITING" : "SAVED"}</div>
                    <div onClick={this.removeNote} className="note-view__actions__trash" />
                </div>
                <input onFocus={this.select} onChange={this.waitForUpdate} name="title" type="text" className="note-view__title" value={this.props.note.title}/>
                <textarea onFocus={this.select} onChange={this.waitForUpdate} name="body" className="note-view__body" value={this.props.note.body} />
            </div>
        )
    }
}
