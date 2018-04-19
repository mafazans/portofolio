const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/posts', catchErrors(apiController.getPosts));
router.get('/post/:slug', catchErrors(apiController.getPost));

module.exports = router;