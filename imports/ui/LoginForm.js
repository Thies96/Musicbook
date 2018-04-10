import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

export default class LoginForm extends Component {


	submitLogin(event) {
    event.preventDefault();
    //Login User
    var userName = $('[name=loginName]').val();
    var password = $('[name=loginPassword]').val();
    Meteor.loginWithPassword(userName, password, function(error){
      if(error){
        console.log(error.reason);
      } else {
        history.push('/app');
      }
    });
  }
	render(){
		return (
		  <div>
          <div className="headline">Login</div>
          <div className="formContainer">
            <form className="login" onSubmit={this.submitLogin.bind(this)}>
              <label htmlFor="loginName">Benutzername
              <input type="text" name="loginName"></input>
              </label>
              <label htmlFor="loginPassword">Password:
              <input type="password" name="loginPassword"></input>
              </label>
              <input type="submit" value="Anmelden"></input>
            </form>
          </div>
          </div>
		);
	}
}