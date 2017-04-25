/**
 * Created by markus.michalsky on 24.04.2017.
 */

import React, {Component} from "react";

export default class ActionBar extends Component {
    render() {
        return <div className="action-bar">
            <div alt="" className="action-bar__logo" />
            <button onClick={this.props.addNote} className="action-bar__new">+</button>
        </div>
    }
}
