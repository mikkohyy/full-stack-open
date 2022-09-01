const { Blog, Session, User } = require('../models')
const { SECRET } = require('./config')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

const errorHandler = (error, req, res, next) => {
  if (error.name === 'SequelizeValidationError') {
    const validationErrors = error.errors.map(error => error.message)
    return res.status(400).send({ error: validationErrors })
  }

  if (error.name === 'TypeError') {
    return res.status(400).send({ error: 'resource does not exist' })
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).send({ error: 'field must be unique'})
  }

  next(error)
}

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      next()
    } catch {
      res.status(401).json({ error: 'token invalid' })
    }
  } else {
    res.status(401).json({ error: 'token missing' })
  }
}

const tokenGetter = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.fullToken = authorization.substring(7)
  } else {
    req.fullToken = null
  }

  next()
}

const sessionChecker = async (req, res, next) => {
  const userId = req.decodedToken.id
  const token = req.fullToken

  const sessionInfo = await Session.findOne({
    attributes: ['user_id', 'token'],
    include: {
      model: User,
      attributes: ['disabled']
    },
    where: {
      [Op.and]: [
        { user_id: userId },
        { token: token }
      ]
    }
  })

  if (sessionInfo && !sessionInfo.user.disabled) {
    next()
  } else {
    res.status(401).end()
  }
}

module.exports = {
  errorHandler,
  blogFinder,
  tokenExtractor,
  tokenGetter,
  sessionChecker
}