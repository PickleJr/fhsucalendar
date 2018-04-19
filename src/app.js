import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import Nav from './nav';

class App extends Component {
    render() {
        return(
            <div>
                <Nav/>
                <div className="container">
                    <h1>Hello, World!</h1>
                    <p>This is the first paragraph</p>
                    <p>This is the second paragraph</p>
                </div>
            </div>
        );
    }
}

export default hot(module)(App);