import React, {Component} from 'react';

export default class NotePreview extends Component
{
    constructor (props) {
        super(props);
        
        this.state = {
            maxLength: 100,
        }
    }
    
    trimBody () {
        return this.props.body.length > this.state.maxLength ? this.props.body.substr(0, this.state.maxLength-3)+'...' : this.props.body;
    }
    
    getTimeDiff() {
        let diff = Math.round(Math.abs(this.props.start.getTime() - this.props.createdAt.getTime()) / 1000);
        
        if (diff < 60) {
            return `${diff} Seconds ago`;
        } else if (diff < 600) {
            return "More than 1 minute ago"
        } else if (diff < 3600) {
            return "Less than 1 hour ago"
        } else if (diff < 10000) {
            return "More than 1 hour ago"
        }else {
            return this.props.createdAt.toDateString();
        }
    }
        
    render() {
        return (
            <li className={"note-preview"+(this.props.active ? " is-selected" : "")}>
                <a data-key={this.props.id} href="#" onClick={this.props.setActiveNote} className="note-preview__link">
                    <div className="note-preview__time">{this.getTimeDiff()}</div>
                    <h3 className="note-preview__title">{this.props.title}</h3>
                    <div className="note-preview__body">{this.trimBody()}</div>
                </a>
            </li>
        )
    }
}
