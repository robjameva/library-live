// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

type Book {
  bookId: String
  authors: [String]
  description: String
  title: String
  image: String
  link: String
  }

  input BookInput {
    authors: [String] 
    description: String!
    title: String!
    bookId: String!
    image: String, 
    link: String
  }

  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
    bookCount: Int
  }

  type Query {
    me(userId: ID!): User
  }

  type Mutation {  
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(userId: ID!, input: BookInput): User
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