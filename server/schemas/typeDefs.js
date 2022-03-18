// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Query {
    getSingleUser(userId: ID!): User
    users: [User]
  }

  type Mutation {  
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(userId: ID!, bookId: String!, description: String!, title: String!): User
    deleteBook(userId: ID!, bookId: String!): User

  }

  type Auth {
    token: ID!
    user: User
  }
`;

// addThought(thoughtText: String!): Thought
// addReaction(thoughtId: ID!, reactionBody: String!): Thought
// addFriend(friendId: ID!): User



// export the typeDefs
module.exports = typeDefs;