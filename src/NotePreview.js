import React, {Component} from 'react';

export default class NotePreview extends Component {
    constructor(props) {
        super(props);
       // let body = props.body;
       // if (body.length > 100) {
       //     body = props.body.substring(0, 97) + '...';
       // }
        this.state = props;
        this.select = this.select.bind(this);
        this.updateData = this.updateData.bind(this);
        this.getNote = this.getNote.bind(this);
        this.prepareBody = this.prepareBody.bind(this);
        this.selected = {};
        this.updateData();

    }

    select() {
        this.state.setSelected(this.state.noteId);
    }


    updateData() {
        this.selected = this.state.getSelected();
    }

    componentWillUpdate() {
        this.updateData();
    }

    getNote() {
        return this.state.getNote(this.state.noteId);
    }

    prepareBody(body) {
        if (body.length > 100) {
             body = body.substring(0, 97) + '...';
        }
        return body;
    }


    render() {
        return <li className={"note-preview" + (this.selected && this.selected.id === this.state.noteId ? ' is-selected' : '')}>
            <a className="note-preview__link" href={"#notes/" + (this.state.noteId)} onClick={this.select}>
                <span className="note-preview__time">{this.getNote().createdAt} minutes ago</span>
                <h2 className="note-preview__title">{this.getNote().title}</h2>
                <p className="note-preview__body">{this.prepareBody(this.getNote().body)}</p>
            </a>
        </li>
    }
}