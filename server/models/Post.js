const { ObjectId } = require("mongodb");
const { database } = require("../config/mongoConnection");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { redisClient } = require("../config/redisConnection");

class Post {
  static async findById(_id) {
    const posts = database.collection("posts");
    const data = await posts.findOne({
      _id: new ObjectId(String(_id)),
    });
    return data;
  }

  static async findAllPost() {
    const posts = database.collection("posts");
    const cachedPosts = await redisClient.get("posts");

    if (cachedPosts) {
      console.log("redis cached data is available");
      return JSON.parse(cachedPosts);
    } else {
      console.log("redis cached data is not available");
    }

    const data = await posts
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $project: {
            "author.password": 0,
          },
        },
      ])
      .toArray();

    await redisClient.setEx("posts", 60, JSON.stringify(data));
    console.log("redis cache is a posted");

    return data;
  }

  static async createPost(body) {
    const posts = database.collection("posts");
    const data = await posts.insertOne({
      ...body,
      authorId: new ObjectId(String(body.authorId)),
    });

    const result = await Post.findById(data.insertedId);

    await redisClient.del("posts");
    console.log("redis cache is deleted");

    return result;
  }

  static async addComment(body, user) {
    const { postId, content } = body;

    const post = database.collection("posts");
    const findPost = await post.findOne({ _id: new ObjectId(String(postId)) });

    const dataInput = {
      content,
      username: user.username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await post.updateOne(
      { _id: findPost._id },
      { $push: { comments: dataInput } }
    );

    const updatePost = await post.findOne({ _id: new ObjectId(postId) });

    await redisClient.del("posts");
    console.log("redis cache is deleted");

    return updatePost;
  }


  static async userLiked(body, user) {
    const { postId } = body;
    const post = database.collection("posts");

    const findPost = await post.findOne({ _id: new ObjectId(String(postId)) });

    const dataLiked = {
      username: user.username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await post.updateOne(
      { _id: findPost._id },
      { $push: { likes: dataLiked } }
    );

    const updateLike = await post.findOne({
      _id: new ObjectId(String(postId)),
    });

    await redisClient.del("posts");
    console.log("redis cache is deleted");

    return updateLike;
  }
}

module.exports = Post;
