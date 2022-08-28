const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    return res.json(blogs)
  } catch (error) {
    return res.status(404).json({error})
  }
});

router.post('/', async (req, res) => {
  const newBlog = req.body;
  try {
    const blog = await Blog.create(newBlog)
    return res.json(blog)
  } catch (error) {
    return res.status(400).json({error})
  }
})

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
  }
  res.status(204).end();
})

module.exports = router