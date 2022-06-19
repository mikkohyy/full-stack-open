const jwt = require('jsonwebtoken')
const { UserInputError, AuthenticationError } = require('apollo-server')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => {
      return Book.collection.countDocuments()
    },
    authorCount: async () => {
      return Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {
      let searchObject = {}

      if (args.genre) {
        searchObject = {
          ...searchObject,
          genres: args.genre,
        }
      }

      /*
      if (args.author) {
        foundBooks = foundBooks.filter((book) => book.author === args.author)
      }
      */

      return Book.find(searchObject).populate('author')
    },
    allAuthors: async () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('unauthorized operation')
      }

      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('unauthorized operation')
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({
          name: args.author,
          bookCount: 1,
          born: null,
          books: [],
        })
      }

      const bookToBeAdded = new Book({ ...args, author: author })

      const updatedBooks = author.books.concat(bookToBeAdded._id)

      try {
        await author.validate()
        await bookToBeAdded.validate()
        await bookToBeAdded.save()
        author.set({ books: updatedBooks })
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: bookToBeAdded })

      return bookToBeAdded
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('unauthorized operation')
      }

      const author = await Author.findOne({ name: args.name })

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author.save()
    },
    createUser: async (root, args) => {
      const newUser = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      })

      try {
        await newUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return newUser.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'password') {
        throw new UserInputError('Wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.SECRET) }
    },
  },
  Author: {
    bookCount: (root) => {
      return root.books.length
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
