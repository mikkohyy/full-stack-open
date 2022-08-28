const { Blog } = require('../models')

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({ error: 'required field is missing'})
  }

  if (error.name === 'TypeError') {
    return res.status(400).send({ error: 'resource does not exist' })
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