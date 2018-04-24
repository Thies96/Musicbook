import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
//Bootstrap Components
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import { Posts } from '../api/posts.js';
import { Comments } from '../api/comments.js';
import Post from './Post.js';
import Comment from './Comment.js';
import AccountsUIWrapper from './AccountsUIWrapper';
import Menu from './Menu.js';


// App component - represents the whole app
class App extends Component {
  //
  renderPosts() {
    let filteredPosts= this.props.posts;

    return filteredPosts.map((post) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = post.owner === currentUserId;

      return (
        <Post
          key={post._id}
          post={post}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }


  handleSubmit(event) {
    event.preventDefault();

    //finde Text Feld mit react ref
    const text = ReactDOM.findDOMNode(this.refs.newPost).value.trim();

    Meteor.call('posts.insert', text);

    //formular leeren
    ReactDOM.findDOMNode(this.refs.newPost).value = '';
  }



  render() {
    return (
      <div className="container">
        <header>
        <Menu />
        </header>
          
         <center> { this.props.currentUser ? 
          <form className="new-Post" onSubmit={this.handleSubmit.bind(this)} >
          <input className="newPost"
            type="text"
            ref="newPost"
            placeholder="Type a new Post!"
          />
          </form> : ''
        } </center>
        <ul>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('posts');
  Meteor.subscribe('comments');

  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    comments: Comments.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);