const createPost = require('./create');
const deletePost = require('./delete');
const getPosts = require('./getAll');
const getPost = require('./getById');
const updatePost = require('./update');

module.exports = { createPost, deletePost, getPost, getPosts, updatePost };
