import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Month extends Component {
    render() {
        let date = null;
        if(this.props.match.params.year && this.props.match.params.month && this.props.match.params.day) {
            date = new Date(this.props.match.params.year, this.props.match.params.month, this.props.match.params.day);
        } else {
            date = new Date();
        }
        return(
            <div>
                <h1>Hello, World!</h1>
                <p>This is the first paragraph</p>
                <p>This is the second paragraph</p>
                <p>This is the day Component!</p>
                <p>{date.toDateString()}</p>
            </div>
        );
    }
}

export default hot(module)(Month);