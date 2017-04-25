/**
 * Created by markus.michalsky on 24.04.2017.
 */

import React, {Component} from "react";
import NotePreview from './NotePreview';

export default class NoteList extends Component {
    constructor(props) {
        super(props);
        
        this.interval = null;
        
        this.state = {
            start: new Date()
        }
    }
    
    componentDidMount () {
        this.interval = setInterval(() => this.refresh(), 1000);
    }
    
     componentWillUnmount() {
        clearInterval(this.interval);
     }
    
    refresh() {
        this.setState({start: new Date()});
    }
    
    render() {
        return (
            <aside className="note-list">
                <h2 className="note-list__title">Notes</h2>
                <div className="note-list__summary">{this.props.notes.length}</div>
                <ul className="note-list__container">
                    {this.props.notes.map(note => <NotePreview start={this.state.start} active={this.props.activeNote === note.id} setActiveNote={this.props.setActiveNote} id={note.id} key={note.id} title={note.title} body={note.body} createdAt={note.createdAt} />)}
                </ul>
            </aside>
        )
    }
}
