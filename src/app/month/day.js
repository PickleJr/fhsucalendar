import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';

class Day extends Component {
    render() {
        let indicator = null;
        if(this.props.events && this.props.events.length > 0) {
            indicator = this.props.events.length;
        }
        if(indicator && this.props.date.month && this.props.date.year) {
            return(
                <div>
                    <Link to={"/day/" + this.props.date.year + "/" + this.props.date.month + "/" + this.props.children}>
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