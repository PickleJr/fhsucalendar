import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Event extends Component {
    render() {
        return(
            <div className="row">
                <div className="col s12">
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">{this.props.event.title}</span>
                            <p>{this.props.event.description}</p>
                        </div>
                        <div className="card-action">
                            <a href={this.props.event.link}>Link</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(module)(Event);