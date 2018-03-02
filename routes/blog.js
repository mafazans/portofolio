const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController')

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(blogController.getPosts));
router.get('/post', blogController.addPost);
router.post('/post', catchErrors(blogController.createPost));
router.post('/post/:id', catchErrors(blogController.updatePost));
router.get('/:id/edit', catchErrors(blogController.editPost));

module.exports = router;