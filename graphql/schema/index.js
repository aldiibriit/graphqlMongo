const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Article{
  _id: ID!
  title: String!
  content: String!
  comments: [Comment]
}

input Pagination{
  limit: Int!
  offset : Int!
}

type Comment{
  _id: ID!
  date: String!
  comment: String!
  article : Article!
}

input CommentInput{
  comment : String!
  date: String!
  article: String!
}

input ArticleInput{
  title: String!
  content: String!
}

type RootQuery {
    comments:[Comment!]!
    articles(pagination:Pagination):[Article!]!
}


type RootMutation {
    createComment(commentInput:CommentInput): Comment
    createArticle(articleInput:ArticleInput): Article
    deleteComment(id:String!): Comment
    deleteArticle(id:String!): Article
    updateComment(id:String!,comment:String!): Comment
    updateArticle(id:String!,title:String!,content:String!):Article
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
