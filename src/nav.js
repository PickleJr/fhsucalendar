import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Nav extends Component {
    componentDidMount() {
        let elem = document.querySelector('.sidenav');
        var instace = M.Sidenav.init(elem, {});
    }
    render() {
        return(
            <div>
                <nav className="nav-wrapper yellow accent-3">
                    <div className="nav-wrapper container">
                        <a href="#!" className="brand-logo hide-on-med-and-down">Calendar</a>
                        <a href="#" data-target="mobile-nav" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="#">Day</a></li>
                            <li><a href="#">Week</a></li>
                            <li><a href="#">Month</a></li>
                        </ul>
                    </div>
                </nav>
                <div className="sidenav" id="mobile-nav">
                    <div id="mobile-nav-header">
                        <span className="left">Calendar</span>
                    </div>
                    <ul>
                        <li><a href="#">Day</a></li>
                        <li><a href="#">Week</a></li>
                        <li><a href="#">Month</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default hot(module)(Nav);