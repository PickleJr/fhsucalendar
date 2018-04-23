import React from 'react';
import ReactDOM from 'react-dom';
import { 
    HashRouter as Router
 } from 'react-router-dom';

import './styles.scss';

import App from './app/';

ReactDOM.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('root')
);