import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

//Formular für die Bearbeitung der Profildaten
export default class ProfileForm extends Component {
	state = {error: false};

  constructor(props) {
    super(props);
    this.setErrorTrue = this.setErrorTrue.bind(this);
    this.setErrorFalse = this.setErrorFalse.bind(this);
  }

  setErrorTrue(){
   this.setState({error: true});
  }
  setErrorFalse(){
   this.setState({error: false});
  }
  	//Submit Funktionen zum ändern der beschreibung und des Nicknames
	submitDisplayName(event){
		event.preventDefault();
		var newName = $('[name=changeName]').val();
		//leere Felder werden nicht gespeichert
		if (newName != ""){
			Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.displayname": newName}});
	  		this.setErrorFalse();
	  	} else {
	  		this.setErrorTrue();
	  	}
	}

	submitText(event){
		event.preventDefault();
		var newDescr = $('[name=changeText]').val();
		if (newDescr != ""){
			Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.description": newDescr}});
			this.setErrorFalse();
		} else {
			this.setErrorTrue();
		}
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

            {this.state.error ? 
            <div className="status">
            Ungültige Eingabe!
            </div> : ""
        	}

			</div>
			
		);
	}
}