import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

class App extends Component {
    render() {
        return(
            <div>
                <h1>Hello, World!</h1>
                <p>This is the first paragraph</p>
                <p>This is the second paragraph</p>
            </div>
        );
    }
}

export default hot(module)(App);