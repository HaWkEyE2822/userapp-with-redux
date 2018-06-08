import React from 'react';
import App from '../components/app';
import { Route, BrowserRouter as Router } from 'react-router-dom';

export default () => (
    <Router>
        <div>
            <Route path='/' component={App} />
        </div>
    </Router>
);

