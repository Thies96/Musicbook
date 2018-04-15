import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

export default class ProfileForm extends Component {
	
	submitDisplayName(event){
		event.preventDefault();
		var newName = $('[name=changeName]').val();
		Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.displayname": newName}}, function(error){
				return("Error");
		});
	}

	submitText(event){
		event.preventDefault();
		var newDescr = $('[name=changeText]').val();
		Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.description": newDescr}}, function(error){
				return("Error");
		});
	}

	render(){
		return(
			<div className="ProfileFormContainer">
			<form className="ChangeName" onSubmit={this.submitDisplayName.bind(this)}>
              <label htmlFor="changeName">Neuer Anzeigename:
              <input type="text" name="changeName"></input>
              </label>
              <input type="submit" value="Speichern"></input>
            </form>

            <form className="ChangeText" onSubmit={this.submitText.bind(this)}>
              <label htmlFor="changeText">Neue Profilbeschreibung: <br></br>
              <textarea name="changeText" cols="35" rows="4"></textarea>
              </label>
              <input type="submit" value="Speichern"></input>
            </form>

			</div>
			
		);
	}
}