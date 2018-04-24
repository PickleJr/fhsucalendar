import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Month extends Component {
    render() {
        return(
            <div>
                <h1>Hello, World!</h1>
                <p>This is the first paragraph</p>
                <p>This is the second paragraph</p>
                <p>This is the day Component!</p>
                <p>{JSON.stringify(this.props)}</p>
            </div>
        );
    }
}

export default hot(module)(Month);