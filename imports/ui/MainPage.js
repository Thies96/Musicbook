
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

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
        <header>
          <h1> Startseite </h1>

          <AccountsUIWrapper />

        </header>
          { this.state.toggle ?
          <div className="LoginContainer">
          <div className="headline">Sign Up</div>
          <div className="formContainer">
            <form name="register">
              <label htmlFor="registerEmail">E-Mail o. Benutzername
              <input type="email" name="registerEmail"></input>
              </label> <br></br>
              <label htmlFor="registerPassword">Password:
              <input type="password" name="registerPassword"></input>
              </label>
              <span className="LoginLink">Bereits Mitglied?
              <button className="toggleLogin" onClick={this.toggleLogin}>
              Login
              </button>
              </span>
              <input type="submit" value="Senden"></input>
            </form>
          </div>
          </div>: 
          <div className="LoginContainer">
          <div className="headline">Login</div>
          <div className="formContainer">
            <form name="login">
              <label htmlFor="loginEmail">E-Mail o. Benutzername
              <input type="email" name="loginEmail"></input>
              </label> <br></br>
              <label htmlFor="loginPassword">Password:
              <input type="password" name="loginPassword"></input>
              </label>
              <span className="LoginLink">Noch kein Konto?
              <button className="toggleRegister" onClick={this.toggleLogin}>
              Registrieren
              </button>
              </span>
              <input type="submit" value="Anmelden"></input>
            </form>
          </div>
          </div>
          }

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