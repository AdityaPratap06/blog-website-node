const express = require('express');
const postModal = require("../Modals/postModal")
const postRouter = express.Router();

const { addNewPost, getAllPosts, getPost, getPopularPosts } = require("../Controller/postController")

postRouter.route("/")
    .post(addNewPost)

postRouter.route('/all')
    .get(getAllPosts)

postRouter.route('/')
    .get(getPost)

postRouter.route('/popular')
    .get(getPopularPosts)

module.exports = postRouter;