const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user
    const blogToBeDeleted = await Blog.findById(request.params.id)

    if (blogToBeDeleted.user.toString() !== user.id) {
      return response.status(401).json({ error: 'blog not created by user' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    await Comment.deleteMany({ blog: request.params.id })

    user.blogs = user.blogs.filter(
      (blog) => blog.toString() !== request.params.id
    )

    await user.save()

    response.status(204).end()
  }
)

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments')

  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'body or url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes || 0,
    comments: [],
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)

  await user.save()

  const blogInfo = await Blog.findById(savedBlog._id)
    .populate('user', { username: 1, name: 1 })
    .populate('comments')

  response.status(201).json(blogInfo)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const commentIds = body.comments.map((comment) => comment.id)

  const blogToBeModified = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
    comments: commentIds,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blogToBeModified,
    { new: true }
  )
    .populate('user', { username: 1, name: 1 })
    .populate('comments')

  response.json(updatedBlog)
})

module.exports = blogsRouter
