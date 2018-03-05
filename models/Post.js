const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: 'Enter the tittle!',
	},
	content: {
		type: String,
		trim: true
	},
	tags: [String],
	slug: String,
	photo: String
});

postSchema.pre('save', function(next) {
	if (!this.isModified('title')) {
		next();
		return;
	}
	this.slug = slug(this.title);
	next();
	//Slug must e unique
});

module.exports = mongoose.model('Post', postSchema);
