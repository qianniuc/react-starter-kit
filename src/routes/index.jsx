import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from '../containers/index';
import Home from '../containers/home/index';

// 分割js文件
const About = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../containers/about/index').default);
    }, 'about');
};

export default (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="about" getComponent={About} />
        </Route>
    </Router>
);
