const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  return res.json(blogs)
});

router.post('/', async (req, res, next) => {
  const newBlog = req.body;
  try {
    const blog = await Blog.create(newBlog)
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