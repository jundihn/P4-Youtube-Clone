const { ObjectId } = require("mongodb");
const { database } = require("../config/mongoConnection");

class Follow {
  static async findAllFollow() {
    const follow = database.collection("follows");
    const data = await follow.find().toArray();

    return data;
  }

  static async findOne(query) {
    const follow = database.collection("follows");
    const result = await follow.findOne(query);
    return result;
  }

  static async findById(_id) {
    const follow = database.collection("follows");
    const data = await follow.findOne({
      _id: new ObjectId(String(_id)),
    });

    return data;
  }

  static async insertFollow(body) {
    const follow = database.collection("follows");
    body.followerId = new ObjectId(String(body.followerId));
    body.followingId = new ObjectId(String(body.followingId));
    body.createdAt = body.updatedAt = new Date().toISOString();
    const data = await follow.insertOne(body);

    return data;
  }
}

module.exports = Follow;
