import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

import { Posts } from '../api/posts.js';
import Comment from './Comment.js';
import App from './App.js';
import { Comments } from '../api/comments.js';

export default class Post extends Component {
  //Funktionsaufrufe aus der Post API
  toggleLiked() {
  Meteor.call('posts.setLiked', this.props.post._id);
   }

  deletePost(){
    Meteor.call('posts.remove', this.props.post._id);
  }

  togglePrivate(){
  	Meteor.call('posts.setPrivate', this.props.post._id, !this.props.post.private);
  }

  //event Handler für das Absenden von Kommentaren
  handleSubmit(event) {
    event.preventDefault();

    //find text field via react ref
    const text = ReactDOM.findDOMNode(this.refs.newComment).value.trim();

    Meteor.call('comments.insert', text, this.props.post._id);

    //clear form
    ReactDOM.findDOMNode(this.refs.newComment).value = '';
  }

  renderComments() {
    let filteredComments = Comments.find({postId: this.props.post._id}, { sort: { createdAt: -1 } }).fetch();

    return filteredComments.map((comment) => {
    const currentUserId = this.props.currentUser && this.props.currentUser._id;

      return (
        <Comment
          key={comment._id}
          comment={comment}
        />
      );
    });
  }


  
  render() {
  	//Posts bekommen ein neues Classname attribut wenn geliked um sie später unterschiedlich zu verarbeiten
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
      		{this.props.post.private ? 'Public' : 'Private'}
      		</button>
      	):''}

        <button className="likeB" onClick = {this.toggleLiked.bind(this)}>
        Like
        </button>

        <button className="delete" onClick = {this.deletePost.bind(this)}>
        <i className="fas fa-trash-alt"></i>
        </button>
         <form className="new-Comment" onSubmit={this.handleSubmit.bind(this)} >
          <input className="newComment"
            type="text"
            ref="newComment"
            placeholder="Type a new Comment!"
          />
          </form>
         {this.renderComments()}
         </li>

    );
  }
}

