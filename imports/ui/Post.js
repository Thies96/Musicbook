import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

import { Posts } from '../api/posts.js';
import { Comments } from '../api/comments.js';

// Post component - represents a single Post
export default class Post extends Component {
  getComs(){
    Meteor.subscribe('comments');
    Meteor.call('comments.getComments', this.props.post._id);
  }
  toggleLiked() {
  Meteor.call('posts.setLiked', this.props.post._id);
   }

  deletePost(){
    Meteor.call('posts.remove', this.props.post._id);
  }

  togglePrivate(){
  	Meteor.call('posts.setPrivate', this.props.post._id, !this.props.post.private);
  }

  handleSubmit(event) {
    event.preventDefault();

    //find text field via react ref
    const text = ReactDOM.findDOMNode(this.refs.newComment).value.trim();

    Meteor.call('comments.insert', text, this.props.post._id);

    //clear form
    ReactDOM.findDOMNode(this.refs.newComment).value = '';
  }

  
  render() {
  	//Give posts a different className when liked to enable dislike
  	const postClassname = classnames({
  		liked: this.props.post.likes ? 'liked' : '',
  		private: this.props.post.private,
  	});

    return (
      <li className={postClassname}>
            	
      	<span className="author"> <strong>{this.props.post.username}</strong> </span> <br></br>

        <span className="text">{this.props.post.text}</span> <br></br>


        <span className="likeCount">{ this.props.post.likedBy.join(', ') } gefällt das</span>

      	{this.props.showPrivateButton ? (
      		<button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
      		{this.props.post.private ? 'Private' : 'Public'}
      		</button>
      	):''}

        <button className="likeB" onClick = {this.toggleLiked.bind(this)}>
        Like
        </button>

        <button className="delete" onClick={this.deletePost.bind(this)}>
        <i className="fas fa-trash-alt"></i>
        </button>
         <form className="new-Comment" onSubmit={this.handleSubmit.bind(this)} >
          <input className="newComment"
            type="text"
            ref="newComment"
            placeholder="Type a new Post!"
          />
          </form>
        <span className="comments">{this.getComs.bind(this)}</span>
        <br></br>
      </li>

    );
  }
}

