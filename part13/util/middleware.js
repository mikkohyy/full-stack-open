const { Blog } = require('../models')

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({ error: 'a field is missing'})
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

module.exports = {
  errorHandler,
  blogFinder
}