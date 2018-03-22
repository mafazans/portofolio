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

// exports.blogIndex = (req, res) => {
// 	res.render('blog/index', {
// 		title: `Arif Mafazan Simohartono | Blog`,
// 		page: `Blog`
// 	});
// };

exports.addPost = (req, res) => {
	res.render('blog/editPost');
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
	req.body.author = req.user._id;
	const post = new Post(req.body);
	await post.save();
	req.flash('success', `Successfully Create Post About ${post.title}`);
	res.redirect(`/blog`);
};

exports.getPosts = async (req, res) => {
	const posts = await Post.find();
	// console.log(posts);
	res.render('blog/index', { posts });
};

const confirmAuthor = (post, user) => {
	if(!post.author.equals(user._id)){
		throw Error('You must be the author to edit the post!')
	}
}

exports.editPost = async (req, res) => {
	const post = await Post.findOne({ _id: req.params.id });

	confirmAuthor(post, req.user);

	res.render('blog/editPost', { title: `Edit ${post.title}`, post });
};

exports.updatePost = async (req, res) => {
	const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true
	}).exec();
	req.flash('success', `Succesfully updated <strong>${post.title}</strong>. <a href="/blog/${post.slug}">View Store</a>`);
	res.redirect(`/blog/${post._id}/edit`);
};

exports.getPostBySlug = async (req, res, next) => {
	const post = await Post.findOne({ slug: req.params.slug }).populate('author');
	if(!post) return next();
	res.render('blog/post', { post, title: post.title})
};