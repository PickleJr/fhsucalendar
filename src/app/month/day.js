import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';

class Day extends Component {
    render() {
        let indicator = "";
        if(typeof this.props.events != 'undefined' && this.props.events.length > 0) {
            indicator = this.props.events.length;
        }
        return(
            <div>
                <span>
                    {this.props.children}
                </span>
                <span>
                    {indicator}
                </span>
            </div>
        );
    }
}

export default hot(module)(Day);