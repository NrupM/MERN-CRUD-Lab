'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: String,
  text: String
});

module.exports = mongoose.model('Comment', CommentSchema);
