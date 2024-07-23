const Post = require("../models/Post");
const { GraphQLError } = require("graphql");

const resolvers = {
  Query: {
    posts: async () => {
      try {
        const data = await Post.findAllPost();

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    findPostById: async (_, args, contextValue) => {
      contextValue.authentication();
      const user = await Post.findById(args._id);

      return user;
    },
  },

  Mutation: {
    createPost: async (_, args, contextValue) => {
      const body = args.newPosts;
      const user = contextValue.authentication();
      // console.log(user.id);
      if (!body.content) {
        throw new GraphQLError("Content is required", {
          extensions: {
            code: "BAD_REQUEST",
          },
        });
      }
      const data = await Post.createPost({
        ...body,
        authorId: user.id,
        likes: [],
        comments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return data;
    },
    addComment: async (_, args, contextValue) => {
      const { postId, content } = args.addComment;
      const user = contextValue.authentication();

      const data = await Post.addComment({ postId, content }, user);

      const result = await Post.findById(data._id);
      return result;
    },

    userLike: async (_, args, contextValue) => {
      try {
        const body = args.userLiked;
        const user = contextValue.authentication();
        const userLike = await Post.userLiked(body, user);
        return userLike;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = resolvers;
