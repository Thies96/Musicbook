
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import history from './history';

import RegistForm from './RegistForm.js';
import LoginForm from './LoginForm.js';
import { Posts } from '../api/posts.js';
import Post from './Post.js';
import AccountsUIWrapper from './AccountsUIWrapper';
// App component - represents the whole app
class MainPage extends Component {
  state = {toggle: true};

  constructor(props) {
    super(props);
    var save = localStorage.getItem('toggle');
    save == 'true' ?
    this.state = {toggle: true} : this.state={toggle:false};
    this.toggleLogin = this.toggleLogin.bind(this);
  }
  toggleLogin(){
   this.setState({toggle: !this.state.toggle});
   localStorage.setItem('toggle', !this.state.toggle);
  }

  render() {
    return (
      <div className="container">
        <header className="navbar fixed-top">
          <h1 className="navbar-brand"> Startseite </h1>

          <AccountsUIWrapper />

        </header>
          <div className="LoginContainer">
          { this.state.toggle ?<RegistForm />:<LoginForm /> }
          { this.state.toggle ?
              <span className="LoginLink">Bereits Registiert?
              <button className="toggleRegister" onClick={this.toggleLogin}>
              Login
              </button>
              </span>
              :
              <span className="LoginLink">Noch kein Konto?
              <button className="toggleLogin" onClick={this.toggleLogin}>
              Registrieren
              </button>
              </span>
          }
          </div>
      </div>
    );
  }
}

export default withTracker(() => {
  //Meteor.subscribe('posts');

  return {
    /*posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(), */
  };
})(MainPage);
