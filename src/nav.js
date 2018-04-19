import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Nav extends Component {
    render() {
        return(
            <nav className="nav-wrapper">
                <a href="#!" className="brand-logo center">Calendar</a>
            </nav>
        );
    }
}

export default hot(module)(Nav);