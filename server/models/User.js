const { ObjectId } = require("mongodb");
const { database } = require("../config/mongoConnection");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");

class User {
  static async findAll() {
    const users = database.collection("users");
    const data = await users.find().toArray();

    return data;
  }

  static async findEmailUser(body) {
    const user = database.collection("users");
    const data = await user.findOne({
      email: body.email,
    });

    return data;
  }

  static async findUsernameUniq(body) {
    const user = database.collection("users");
    const data = await user.findOne({
      username: body.username,
    });

    return data;
  }

  static async findById(_id) {
    try {
      const users = database.collection("users");

      const data = await users
        .aggregate([
          {
            $match: {
              _id: new ObjectId(_id),
            },
          },
          {
            $lookup: {
              from: "follows",
              localField: "_id",
              foreignField: "followerId",
              as: "following",
              pipeline: [
                {
                  $lookup: {
                    from: "users",
                    localField: "followingId",
                    foreignField: "_id",
                    as: "followingDetail",
                  },
                },
                {
                  $sort: {
                    createdAt: -1,
                  },
                },
                {
                  $unwind: {
                    path: "$followingDetail",
                  },
                },
                {
                  $project: {
                    "followingDetail._id": 0,
                    "followingDetail.name": 0,
                    "followingDetail.email": 0,
                    "followingDetail.password": 0,
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: "follows",
              localField: "_id",
              foreignField: "followingId",
              as: "follower",
              pipeline: [
                {
                  $lookup: {
                    from: "users",
                    localField: "followerId",
                    foreignField: "_id",
                    as: "followerDetail",
                  },
                },
                {
                  $sort: {
                    createdAt: -1,
                  },
                },
                {
                  $unwind: {
                    path: "$followerDetail",
                  },
                },
                {
                  $project: {
                    "followerDetail._id": 0,
                    "followerDetail.name": 0,
                    "followerDetail.email": 0,
                    "followerDetail.password": 0,
                  },
                },
              ],
            },
          },
        ])
        .toArray();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async registerUser(body) {
    const users = database.collection("users");
    body.password = hashPassword(body.password);
    const data = await users.insertOne(body);
    console.log(data, "dari modelll");
    return data;
  }

  static async searchUserByName(username) {
    const user = database.collection("users");
    const data = await user
      .find({
        username: { $regex: username, $options: "i" },
      })
      .toArray();

    return data;
  }

  static async loginUser(body) {
    const users = database.collection("users");
    const data = await users.findOne({
      username: body.username,
    });

    return data;
  }
}

module.exports = User;
