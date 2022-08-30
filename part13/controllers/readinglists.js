const router = require('express').Router()

const { UserBlogs } = require('../models')

router.post('/', async (req, res, next) => {
  console.log(UserBlogs)
  try {
    await UserBlogs.create(req.body)
    res.status(200).end()
  } catch(error) {
    console.log(error)
    next(error)
  }
})

module.exports = router