const createPost = require('./create');
const deletePost = require('./delete');
const getPosts = require('./getAll');
const getPost = require('./getById');
const updatePost = require('./update');
const userPosts = require('./userPosts');

module.exports = {
  userPosts,
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
};
