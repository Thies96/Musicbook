import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

import { Posts } from '../api/posts.js';
import Post from './Post.js';
import { Comments } from '../api/comments.js';

// Post component - represents a single Post
export default class Comment extends Component {
  deleteComment(){
    Meteor.call('comments.remove', this.props.comment._id);
  }
  
  render() {

    return (
        <ul>
      	<span className="author"> <strong>{this.props.comment.username}</strong> </span> <br></br>

        <span className="text">{this.props.comment.text}</span> <br></br>
        <span className="date">{this.props.comment.createdAt}</span>

        <button className="delete" onClick={this.deleteComment.bind(this)}>
        <i className="fas fa-trash-alt"></i>
        </button>
        </ul>
    );
  }
}

