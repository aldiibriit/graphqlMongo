const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  article: {
      type: Schema.Types.ObjectId,
      ref: 'Article'
  }
});

module.exports = mongoose.model('Comment', commentSchema);
