const Article = require('../../models/article');


module.exports = {
  articles: async (args) => {
    try {
      const articles = await Article.find().populate("comments").limit(args.pagination.limit).skip(args.pagination.offset);
      return articles.map(article => {
        return article;
      });
    } catch (err) {
      throw err;
    }
  },
  createArticle: async (args, req) => {
    const article = new Article({
      title: args.articleInput.title,
      content: args.articleInput.content,
    });
    let createdArticle;
    try {
      const result = await article.save();

      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  updateArticle: async (args)=>{
    const filter = { _id: args.id };
    const update = { 
      title: args.title,
      content: args.content
     };
    try{
    const result = await Article.findOneAndUpdate(
      filter,
      update,
      {returnOriginal: true})
      
      return result;
    }catch(err){
      throw err;
    }
  },
  deleteArticle:async (args)=>{
    const filter = {_id:args.id}
    try {
      const result = await Article.findOneAndDelete(
        filter
      );
      return result
    } catch (err) {
      return err;
    }
  }
};
