import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

export default class RegistForm extends Component {

	submitRegister(event) {
    event.preventDefault();
    //Register User
    var email = $('[name=registerEmail]').val();
    var userName = $('[name=registerName]').val();
    var password = $('[name=registerPassword]').val();
    Accounts.createUser({
            email: email,
            username: userName,
            password: password,
            createdAt: new Date()
        }, function(error){
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
          <div className="headline">Sign Up</div>
          <div className="formContainer">
            <form className="register" onSubmit={this.submitRegister.bind(this)}>
              <label htmlFor="registerEmail">E-Mail
              <input type="email" name="registerEmail"></input>
              </label> 
              <label htmlFor="registerName">Benutzername
              <input type="text" name="registerName"></input>
              </label>
              <label htmlFor="registerPassword">Password:
              <input type="password" name="registerPassword"></input>
              </label>
              <label htmlFor="registerPasswordRepeat">Password wiederholen:
              <input type="password" name="registerPasswordRepeat"></input>
              </label>
              <input type="submit" value="Senden"></input>
            </form>
          </div>
          </div>
		);
	}
}