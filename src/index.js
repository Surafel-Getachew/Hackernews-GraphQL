const { GraphQLServer } = require("graphql-yoga");
const {prisma} = require("./generated/prisma-client")
// 1
const typeDefs = "./schema.graphql"

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Links");

// 2
const resolvers = {
 Query,
 Mutation,
 User,
 Link, 
};

// 3
const server = new GraphQLServer({ typeDefs, resolvers, context: request => {
  return {
    ...request,
    prisma,
  }
} });

server.start(() => console.log("server is up and running"));
