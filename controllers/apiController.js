const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.getPosts = async (req, res) => {
	const posts = await Post.find();
    res.json(posts);
};