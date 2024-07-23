import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation CreatePost($newPosts: PostInput) {
    createPost(newPosts: $newPosts) {
      _id
      content
      tags
      imgUrl
      authorId
      author {
        username
        password
        name
        email
        _id
      }
      comments {
        username
        content
        updatedAt
        createdAt
      }
      likes {
        username
        updatedAt
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_POST = gql`
  query Posts {
    posts {
      _id
      content
      tags
      imgUrl
      authorId
      author {
        _id
        name
        username
        email
        password
      }
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const ADD_LIKE = gql`
  mutation Mutation($userLiked: LikeInput) {
    userLike(userLiked: $userLiked) {
      _id
      content
      tags
      imgUrl
      authorId
      author {
        _id
        name
        username
        email
        password
      }
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation Mutation($addComment: CommentInput) {
    addComment(addComment: $addComment) {
      _id
      content
      tags
      imgUrl
      authorId
      author {
        _id
        name
        username
        email
        password
      }
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query Query($id: ID) {
    findPostById(_id: $id) {
      _id
      content
      tags
      imgUrl
      authorId
      author {
        _id
        name
        username
        email
        password
      }
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
