import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';

class Day extends Component {
    render() {
        return(
            <div>
                <span>
                    {this.props.children}
                </span>
            </div>
        );
    }
}

export default hot(module)(Day);