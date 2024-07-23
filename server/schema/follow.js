const typeDefs = `#graphql
  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }

  input FollowInput {
    followingId: ID
  }

  type Mutation {
  followUser(newFollow: FollowInput): Follow
  }
`;

module.exports = typeDefs;
