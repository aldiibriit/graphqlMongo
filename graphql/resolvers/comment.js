const Comment = require('../../models/comment');
const Article = require('../../models/article');
const { transformComment } = require('./merge');

module.exports = {
  comments: async () => {
    try {
      const comments = await Comment.find();
      return comments.map(comment => {
        return transformComment(comment);
      });
    } catch (err) {
      throw err;
    }
  },
  createComment: async (args) => {
    const comment = new Comment({
      comment: args.commentInput.comment,
      article: args.commentInput.article,
      date: new Date(args.commentInput.date),
    });
    try {
      const result = await comment.save();
      const article = await Article.findById(args.commentInput.article);

      if (!article){
        throw new Error("Article not found.");
      }

      article.comments.push(comment)
      await article.save()

      return result;
    } catch (err) {
      throw err;
    }
  },
  updateComment: async (args)=>{
    const filter = { _id: args.id };
    const update = { comment: args.comment };
    try{
    const result = await Comment.findOneAndUpdate(
      filter,
      update,
      {returnOriginal: true})
      
      return result;
    }catch(err){
      throw err;
    }
  },
  deleteComment:async (args)=>{
    const filter = {_id:args.id}
    try {
      const result = await Comment.findOneAndDelete(
        filter
      );
      return result
    } catch (err) {
      return err;
    }
  }
};
