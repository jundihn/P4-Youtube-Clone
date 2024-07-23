if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { verifyToken } = require("./helpers/jwt_token");

const userTypeDefs = require("./schema/user");
const postTypeDefs = require("./schema/post");
const followTypeDefs = require("./schema/follow");

const userResolvers = require("./resolvers/user");
const postResolvers = require("./resolvers/post");
const followResolvers = require("./resolvers/follow");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],

  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 3000 },

  context: ({ req }) => {
    function authentication() {
      const authorization = req.headers.authorization || "";

      if (!authorization) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      const [type, token] = authorization.split(" ");

      if (type !== "Bearer") {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      const payload = verifyToken(token);

      if (!payload) {
        throw new GraphQLError("Invalid access token", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      return payload;
    }

    return {
      authentication,
    };
  },
})
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((error) => {
    console.log(error);
  });
