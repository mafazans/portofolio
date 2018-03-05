const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController')

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(blogController.getPosts));
router.get('/post', blogController.addPost);

router.post('/post',
	blogController.upload,
	catchErrors(blogController.resize),
	catchErrors(blogController.createPost));

router.post('/post/:id',
	blogController.upload,
	catchErrors(blogController.resize),
	catchErrors(blogController.updatePost));

router.get('/:id/edit', catchErrors(blogController.editPost));

router.get('/:slug', catchErrors(blogController.getPostBySlug));

module.exports = router;