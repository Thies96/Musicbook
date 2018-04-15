import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

export default class ProfileView extends Component {

	render(){
		return(
			<div className="ProfileContainer">
			<span>Benutzername: {Meteor.user().username} </span> <br></br>
			<span>Email: {Meteor.user().emails[0].address}  </span> <br></br>
			<span>Anzeigename: {Meteor.user().profile.displayname}</span><br></br>
			<span>Profilbeschreibung: {Meteor.user().profile.description}</span><br></br>
			</div>
			
		);
	}
}