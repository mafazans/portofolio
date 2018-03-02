const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.blogIndex = (req, res) => {
	res.render('./blog/index', {
		title: `Arif Mafazan Simohartono | Blog`,
		page: `Blog`
	});
};

exports.addPost = (req, res) => {
	res.render('./blog/editPost');
};

exports.createPost = async (req, res) => {
	const post = new Post(req.body);
	await post.save();
	req.flash('success', `Successfully Create Post About ${post.title}`);
	res.redirect(`/blog/${post.slug}`);
};

exports.getPosts = async (req, res) => {
	const posts = await Post.find();
	// console.log(posts);
	res.render('./blog/posts', { title: `Mafazans Blog Posts`, posts });
};

exports.editPost = async (req, res) => {
	const post = await Post.findOne({ _id: req.params.id });
	res.render('blog/editPost', { title: `Edit ${post.title}`, post });
};

exports.updatePost = async (req, res) => {
	const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true
	}).exec();
	req.flash('success', `Succesfully updated <strong>${post.title}</strong>. <a href="/post/${post.slug}">View Store</a>`);
	res.redirect('/blog/${post._id}/edit');
}