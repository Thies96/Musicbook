import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

import { Posts } from '../api/posts.js'

// Post component - represents a single todo item
export default class Post extends Component {
   toggleLiked() {
      //count the like property +1 of its current value
  Meteor.call('posts.setLiked', this.props.post._id);
   }

  deletePost(){
    Meteor.call('posts.remove', this.props.post._id);
  }

  togglePrivate(){
  	Meteor.call('posts.setPrivate', this.props.post._id, !this.props.post.private);
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
      </li>
    );
  }
}

