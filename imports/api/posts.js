import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Comments } from '../api/comments.js';

export const Posts = new Mongo.Collection('posts');

var currentdate = new Date(); 
var datetime = currentdate.getDate() + "."
                + (currentdate.getMonth()+1)  + "." 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();

if (Meteor.isServer) {
	//this code runs on server only
	Meteor.publish('posts', function postsPublication(){
		return Posts.find({
			$or: [
				{ private: {$ne: true} },
				{ owner: this.userId },
			],
		});
	});
}

Meteor.methods({
	'posts.insert'(text){
	check(text, String);

	if(!this.userId){
		throw new Meteor.Error('not-authorized');
	}

	Posts.insert({
		text,
		createdAt: datetime,
		likedBy: [],
		private: false,
		owner: this.userId,
		username: Meteor.users.findOne(this.userId).username,
		comments: [],
	});
	},
	'posts.remove'(postId) {
		check(postId, String);

		const post = Posts.findOne(postId);
		if (post.private || post.owner !== this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Posts.remove(postId);
	},
	'posts.setLiked'(postId){
		check(postId, String);

		if (Posts.find( { _id: postId, likedBy : Meteor.users.findOne(this.userId).username } ).count() > 0)
		{
			Posts.update(postId, { $pull: { likedBy: Meteor.users.findOne(this.userId).username } });}
		else{
    		Posts.update(postId, { $addToSet: { likedBy: Meteor.users.findOne(this.userId).username } });}
    	},
	'posts.setPrivate'(postId, setToPrivate) {
		check(postId, String);
		check(setToPrivate, Boolean);

		const post = Posts.findOne(postId);

		//make sure only post owner can make a post private
		if (post.owner !== this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Posts.update(postId, { $set: { private: setToPrivate } });
	},
});
