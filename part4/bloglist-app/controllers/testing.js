const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  console.log('err')

  await User.deleteMany({})
  console.log('err2')

  await Blog.deleteMany({})

  console.log('err3')

  response.status(204).end()
})

module.exports = router