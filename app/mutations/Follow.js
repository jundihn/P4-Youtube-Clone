import { gql } from "@apollo/client";

export const FOLLOW_USER = gql`
  mutation Mutation($newFollow: FollowInput) {
    followUser(newFollow: $newFollow) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;
