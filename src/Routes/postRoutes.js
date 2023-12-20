const express = require('express');
const postModal = require("../Modals/postModal")
const postRouter = express.Router();

const { addNewPost, getAllPosts } = require("../Controller/postController")

postRouter.route("/")
    .post(addNewPost)

postRouter.route('/all')
    .get(getAllPosts)

module.exports = postRouter;