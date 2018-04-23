import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Comments = new Mongo.Collection('comments');

var currentdate = new Date(); 
var datetime = currentdate.getDate() + "."
                + (currentdate.getMonth()+1)  + "." 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();

if (Meteor.isServer) {
	//this code runs on server only
	Meteor.publish('comments', function commentsPublication(){
		return Comments.find({});
	});
}

Meteor.methods({
	'comments.insert'(text, postId){
	check(text, String);
	check(postId, String);

	if(!this.userId){
		throw new Meteor.Error('not-authorized');
	}

	Comments.insert({
		text,
		postId,
		createdAt: datetime,
		owner: this.userId,
		username: Meteor.users.findOne(this.userId).username,
	});
	},
	 'comments.getComments'(postId){
    	check(postId, String);

    	Comments.find({});
    },
	'comments.remove'(commentId) {
		check(commentId, String);

		const comment = Comments.findOne(commentId);
		if (comment.owner !== this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Comments.remove(commentId);
	},
});
