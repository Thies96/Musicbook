
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Posts } from '../api/posts.js';
import Post from './Post.js';
import AccountsUIWrapper from './AccountsUIWrapper';

// App component - represents the whole app
class App extends Component {

  handleSubmit(event) {
    event.preventDefault();

    //find text field via react ref
    const text = ReactDOM.findDOMNode(this.refs.newPost).value.trim();

    Meteor.call('posts.insert', text);

    //clear form
    ReactDOM.findDOMNode(this.refs.newPost).value = '';
  }

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

  render() {
    return (
      <div className="container">
        <header>
          <h1> Musicbook </h1>

          <AccountsUIWrapper />
          
          { this.props.currentUser ? 
          <form className="new-Post" onSubmit={this.handleSubmit.bind(this)} >
          <input className="newPost"
            type="text"
            ref="newPost"
            placeholder="Type a new Post!"
          />
          </form> : ''
        }
        </header>

        <ul>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('posts');

  return {
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);