const { ObjectId } = require("mongodb");
const Follow = require("../models/Follow");

const resolvers = {
  Mutation: {
    followUser: async (_, args, contextValue) => {
      const body = args.newFollow;
      const user = contextValue.authentication();

      const followerId = new ObjectId(String(user.id));
      const followingId = new ObjectId(String(body.followingId));
      //   console.log(user);
      const findUser = await Follow.findOne({
        followerId: followerId,
        followingId: followingId,
      });

      if (findUser) {
        throw new GraphQLError("You already following this user", {
          extensions: {
            code: "BAD_REQUEST",
          },
        });
      }

      const data = await Follow.insertFollow({
        ...body,
        followerId: followerId,
        followingId: followingId,
      });

      const result = await Follow.findById(data.insertedId);

      return result;
    },
  },
};

module.exports = resolvers;
