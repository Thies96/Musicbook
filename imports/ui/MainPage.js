
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import history from './history';

import RegistForm from './RegistForm.js';
import LoginForm from './LoginForm.js';
import { Posts } from '../api/posts.js';
import Post from './Post.js';
import AccountsUIWrapper from './AccountsUIWrapper';

export default class MainPage extends Component {
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

        <div className="img-fluid"></div>

        <div className="mask">
          <h1 className="firstMask">Meet people.</h1>
          <h1>Form a band.</h1>
          <h1>Jam.</h1>
        </div>

        <header className="navbar fixed-top">
          <h1 className="navbar-brand"> Musicbook </h1>

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

