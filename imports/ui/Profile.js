
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import ProfileForm from './ProfileForm.js';
import ProfileView from './ProfileView.js';
import { Posts } from '../api/posts.js';
import Post from './Post.js';
import AccountsUIWrapper from './AccountsUIWrapper';

// App component - represents the whole app
class Profile extends Component {
  state = {toggle: false};

  constructor(props) {
    super(props);
    var save = localStorage.getItem('toggle');
    save == 'true' ? 
    this.state = {toggle: true} : this.state={toggle:false};
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  toggleEdit(){
   this.setState({toggle: !this.state.toggle});
   localStorage.setItem('toggle', !this.state.toggle);  
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1> Profil </h1>
          <AccountsUIWrapper />                  
          </header>
          <div className="content">
                    
          { this.props.currentUser ? <ProfileView /> : ''}

          {this.state.toggle ? 
          <button className="edit" onClick={this.toggleEdit}>
          Schließen
          </button> :
          <button className="edit" onClick={this.toggleEdit}>
          Bearbeiten
          </button>
          }
          
          { this.state.toggle ? <ProfileForm /> : ''}    
          </div>
      </div>
    );
  }
}

export default withTracker(() => {
  //Meteor.subscribe('posts');

  return {
    //posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(Profile);