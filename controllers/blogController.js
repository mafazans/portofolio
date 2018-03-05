const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next){
		const isPhoto = file.mimetype.startsWith('image/');
		if(isPhoto){
			next(null, true);
		}else {
			next({ message: 'That filetype is not allowed!' }, false);
		}
	}
};

exports.blogIndex = (req, res) => {
	res.render('./blog/index', {
		title: `Arif Mafazan Simohartono | Blog`,
		page: `Blog`
	});
};

exports.addPost = (req, res) => {
	res.render('./blog/editPost');
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async(req, res, next) => {
	if (!req.file) {
		next();
		return;
	}
	const extension = req.file.mimetype.split('/')[1];
	req.body.photo = `${uuid.v4()}.${extension}`;
	const photo = await jimp.read(req.file.buffer);
	await photo.resize(800, jimp.AUTO);
	await photo.write(`./public/uploads/${req.body.photo}`);
	next();
}

exports.createPost = async (req, res) => {
	const post = new Post(req.body);
	await post.save();
	req.flash('success', `Successfully Create Post About ${post.title}`);
	res.redirect(`./blog/${post.slug}`);
};

exports.getPosts = async (req, res) => {
	const posts = await Post.find();
	// console.log(posts);
	res.render('./blog/posts', { title: `Mafazans Blog Posts`, posts });
};

exports.editPost = async (req, res) => {
	const post = await Post.findOne({ _id: req.params.id });
	res.render('./blog/editPost', { title: `Edit ${post.title}`, post });
};

exports.updatePost = async (req, res) => {
	const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true
	}).exec();
	req.flash('success', `Succesfully updated <strong>${post.title}</strong>. <a href="/post/${post.slug}">View Store</a>`);
	res.redirect('./blog/${post._id}/edit');
};

exports.getPostBySlug = async (req, res, next) => {
	const post = await Post.findOne({ slug: req.params.slug });
	if(!post) return next();
	res.render('./blog/post', { post, title: post.title})
};