const createPost = require('./create');
const deletePost = require('./delete');
const getPosts = require('./getAll');
const getPost = require('./getById');
const updatePost = require('./update');
const userPotsts = require('./userPosts');

module.exports = {
  userPotsts,
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
};
