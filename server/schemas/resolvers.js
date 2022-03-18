const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, { userId }) => {
            return User.findOne({ _id: userId })
                .select('-__v')
        },

    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, args) => {

            const updatedUser = await User.findOneAndUpdate(
                { _id: args.userId },
                { $addToSet: { savedBooks: { bookId: args.input.bookId, description: args.input.description, title: args.input.title } } },
                { new: true, runValidators: true }
            );

            return updatedUser;
        },
        deleteBook: async (parent, args) => {

            const updatedUser = await User.findOneAndUpdate(
                { _id: args.userId },
                { $pull: { savedBooks: { bookId: args.bookId, } } },
                { new: true, runValidators: true }
            );

            return updatedUser;
        }
    }
};

module.exports = resolvers;