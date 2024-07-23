const { ObjectId } = require("mongodb");
const { GraphQLError } = require("graphql");
const validator = require("validator");
const { signToken } = require("../helpers/jwt_token");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const User = require("../models/user");

const resolvers = {
  Query: {
    users: async () => {
      try {
        const data = await User.findAll();
        // console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    findUserById: async (_, args, contextValue) => {
      //   contextValue.authentication();
      const user = await User.findById(args._id);

      // console.log(user);
      return user;
    },

    searchUser: async (_, args, contextValue) => {
      contextValue.authentication();
      const user = await User.searchUserByName(args.username);
      //   console.log(contextValue.user, "dari resolvers");

      return user;
    },
  },

  Mutation: {
    register: async (_, args) => {
      const body = args.register;

      if (!validator.isEmail(body.email)) {
        throw new GraphQLError("Please enter email format", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const emailValidate = await User.findEmailUser(body);

      if (emailValidate) {
        throw new GraphQLError("Email should be unique", {
          extensions: {
            code: "BAD_REQUEST",
          },
        });
      }

      const usernameValidate = await User.findUsernameUniq(body);

      if (usernameValidate) {
        throw new GraphQLError("Username should be unique", {
          extensions: {
            code: "BAD_REQUEST",
          },
        });
      }

      if (body.password.length < 5) {
        throw new GraphQLError("Password min 5 character", {
          extensions: {
            code: "BAD_REQUEST",
          },
        });
      }
      const data = await User.registerUser(body);
      console.log(data, "data resolvers");

      const result = await User.findById(data.insertedId);
      console.log(result, "ini result resolvers");
      return result;
    },
    login: async (_, args) => {
      const body = args.login;
      //   console.log(body);
      const data = await User.loginUser(body);
      //   console.log(data);

      if (!comparePassword(body.password, data.password)) {
        throw new Error("anjay salah pass");
      }

      const result = {
        access_token: signToken({
          id: data._id,
          username: data.username,
          email: data.email,
        }),
      };
      //   console.log(result);
      return result;
    },
  },
};

module.exports = resolvers;
