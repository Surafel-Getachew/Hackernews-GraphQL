const { GraphQLServer } = require("graphql-yoga");
const {prisma} = require("./generated/prisma-client")
// 1
const typeDefs = "./schema.graphql"


// 2
const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews Clone",
    feed: (root,args,context,ingo) => {
      return context.prisma.links()
    }
  },
  Mutation: {
      post:(root,args,context) => {
          return context.prisma.createLink({
            url:args.url,
            description: args.description
          })
      }
  },
  
};

// 3
const server = new GraphQLServer({ typeDefs, resolvers, context: {prisma} });

server.start(() => console.log("server is up and running"));
