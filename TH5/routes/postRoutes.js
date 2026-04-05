const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Trang chủ (list)
router.get('/', postController.getAllPosts);

// ====== CREATE ======
router.get('/blogposts/new', postController.getCreatePost);
router.post('/blogposts/store', postController.createPost);

// ====== DETAIL ======
router.get('/blogposts/:id', postController.getPostDetail);

// ====== EDIT ======
router.get('/blogposts/edit/:id', postController.getEditPost);
router.post('/blogposts/update/:id', postController.updatePost);

// ====== DELETE ======
router.get('/blogposts/delete/:id', postController.deletePost);

module.exports = router;
