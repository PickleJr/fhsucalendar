import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';

class Day extends Component {
    render() {
        let indicator = null;
        if(typeof this.props.events != 'undefined' && this.props.events.length > 0) {
            indicator = this.props.events.length;
        }
        if(indicator) {
            return(
                <div>
                    <Link to="day/">
                        <span>
                            {this.props.children}
                        </span>
                        <div>
                            <i className="material-icons">event</i>
                        </div>
                    </Link>
                </div>
            );
        } else {
            return(
                <div>
                    <span>{this.props.children}</span>
                </div>
            );
        }
    }
}

export default hot(module)(Day);