import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Users {
    users {
      _id
      name
      username
      email
      password
    }
  }
`;

export const SEARCH_USER = gql`
  query SearchUser($username: String!) {
  searchUser(username: $username) {
    _id
    name
    username
    email
    password
  }
}
`;

export const FIND_USER_BY_ID = gql`
  query FindUserById($id: ID) {
    findUserById(_id: $id) {
      _id
      name
      username
      email
      password
      follower {
        followerId
        followerDetail {
          username
        }
      }
      following {
        followingId
        followingDetail {
          username
        }
      }
    }
  }
`;
