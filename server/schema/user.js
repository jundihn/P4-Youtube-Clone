const typeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
  }

  type FollowDetail {
    username: String
  }

  type Following {
    followingId: String
    followingDetail: FollowDetail 
  }

  type Follower {
    followerId: String
    followerDetail: FollowDetail
  }

  type UserProfile {
    _id: ID
    name: String
    username: String
    email: String
    password: String
    follower: [Follower]
    following: [Following]
  }

  type Query {
    users: [User]
    findUserById(_id: ID): [UserProfile]
    searchUser(username: String!): [User!]
  }

  type Token {
    access_token: String
  }

  input RegisterUser {
    name: String
    username: String
    email: String
    password: String
  }

  input LoginUser {
    username: String
    password: String
  }

  type Mutation {
    register(register: RegisterUser): [User]
    login(login: LoginUser): Token
  }
`;

module.exports = typeDefs;
