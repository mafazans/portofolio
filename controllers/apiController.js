const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.getPosts = async (req, res) => {
	const posts = await Post.find();
    res.json(posts);
};

exports.getPost = async (req, res) => {
	const slug = req.params.slug;
	const post = await Post.find({ slug });
    res.json(post);
};