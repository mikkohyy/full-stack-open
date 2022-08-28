const router = require('express').Router()
const { blogFinder, tokenExtractor } = require('../util/middleware')

const { Blog } = require('../models')
const { User } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  return res.json(blogs)
});

router.post('/', tokenExtractor, async (req, res, next) => {
  const newBlog = req.body;
  try {
    const userWhoAdded = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...newBlog, userId: userWhoAdded.id})
    return res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
  }
  res.status(204).end();
})

router.put('/:id', blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.blog.likes + 1
    await req.blog.save()
    res.json(req.blog)
  } catch(error) {
    next(error)
  }
})

module.exports = router