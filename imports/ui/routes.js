import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { render } from 'react-dom';
import history from './history';

import App from './App';
import MainPage from './MainPage';
import Profile from './Profile';
import NotFound from './NotFound';
import Menu from './Menu';

Meteor.startup(() => {
  render(
  	<Router history={history}>
	  	<Switch>
	  		<Route exact path="/" component={MainPage}/>
	  		<Route exact path="/app" component={App}/>
	  		<Route exact path="/profile" component={Profile}/>
	  		<Route exact path="/menu" component={Menu}/>
	  		<Route component={NotFound}/>
	  	</Switch>
  	</Router>,
  	document.getElementById('render-target')
  	);
});