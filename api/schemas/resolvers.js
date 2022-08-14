const { AuthenticationError } = require('apollo-server-express');
const { Food, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('foods');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('foods');
    },

    foods: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Food.find(params).sort({createdAt: -1});
    },

    singleFood: async (parent, { foodId }) => {
      return Food.findOne({ _id: foodId })
    }
  },

  Mutation: {
    addUser: async(parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user)

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    
    addFood: async (parent, { name, description, servings, expiry, imageUrl, ingredients }, context) => {
      if (context.user) {
        const food = await Food.create({ 
          name, 
          donatedBy: context.user.username,
          description, 
          servings, 
          expiry, 
          imageUrl, 
          ingredients 
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          {$addToSet: { foods: food._id }}

        )
        return food;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeFood: async(parent, { foodId }, context) => {
      if (context.user) {
        const food = Food.findOneAndDelete({ 
          _id: foodId,
          donatedBy: context.user.username,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { foods: food._id }}
        );
        return food
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }
};



module.exports = resolvers;