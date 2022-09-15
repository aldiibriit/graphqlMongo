const DataLoader = require('dataloader');

const Comment = require('../../models/comment');
const Article = require('../../models/article');
const { dateToString } = require('../../helpers/date');


const commentLoader = new DataLoader((commentIds) => {
  return comments(commentIds);
});

const articleLoader = new DataLoader(articleIds => {
  return Article.find({_id: {$in: articleIds}});
});


const comments = async commentIds => {
  try {
    const comments = await Comment.find({ _id: { $in: commentIds } });
    return comments.map(comment => {
      return transformComment(comment);
    });
  } catch (err) {
    throw err;
  }
};


const article = async articleId => {
  try {
    const article = await articleLoader.load(articleId.toString());
    return {
      ...article._doc,
      _id: article.id,
      comments: commentLoader.load.bind(this, article._doc.comments)
    };
  } catch (err) {
    throw err;
  }
};

const transformComment = comment => {
  return {
    ...comment._doc,
    _id: comment.id,
    date: dateToString(comment._doc.date),
    article: article.bind(this, comment.article)
  };
};

exports.transformComment = transformComment;

