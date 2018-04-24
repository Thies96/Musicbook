
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

// App component - represents the whole app
class App extends Component {

  render() {
    return (
      <div className="container">
        <header>
          <h1> Page not found </h1>
        </header>
      </div>
    );
  }
}

export default withTracker(() => {
  //Meteor.subscribe('posts');

  return {
    //posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    //currentUser: Meteor.user(),
  };
})(App);