const typeDefs = `#graphql
  type Comment {
    content: String
    username: String
    createdAt: String
    updatedAt: String
  }

  type Like {
    username: String
    createdAt: String
    updatedAt: String
  }

  type User {
    _id: ID
    name: String
    username: String
    email: String
  }

  type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    author: User
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
  }

  type Query {
    posts: [Post]
    findPostById(_id: ID): Post
  }

  input CommentInput {
    postId: ID
    content: String
  }

  input LikeInput {
    postId: ID
  }

  input PostInput {
    content: String
    tags: [String]
    imgUrl: String
  }

  type Mutation {
    createPost(newPosts: PostInput): Post
    addComment(addComment: CommentInput): Post
    userLike(userLiked: LikeInput): Post
  }
`;

module.exports = typeDefs;
