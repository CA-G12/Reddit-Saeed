const createUser = require('./createUser');
const searchUser = require('./searchUserByEmail');
const getUser = require('./getUserById');
const allUsers = require('./allUsers');

module.exports = { allUsers, createUser, searchUser, getUser };
