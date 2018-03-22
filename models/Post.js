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
	photo: String,
	author: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: 'You must have an author!'
	}
});

postSchema.index({
	title: 'text',
	content: 'text'
});

postSchema.pre('save', async function(next) {
	if (!this.isModified('title')) {
		next();
		return;
	}
	this.slug = slug(this.title);

	const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*)?)$`, 'i');
	const postWithSlug = await this.constructor.find({ slug: slugRegEx });
	if(postWithSlug.length) {
		this.slug = `${this.slug}-${postWithSlug.length + 1 }`;
	}

	next();
	//Slug must e unique
});

module.exports = mongoose.model('Post', postSchema);
