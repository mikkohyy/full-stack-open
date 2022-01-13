const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
})

afterAll(() => {
  mongoose.connection.close()
})

test('all blogs are returned', async () => {
  helper.addMultipleBlogs()
  const response = await api.get('/api/blogs')
  const returnedBlogs = response.body

  expect(returnedBlogs).toHaveLength(helper.listWithManyBlogs.length)
})

test('a returned blog object has property id', async () => {
  const blogObject = new Blog(helper.individualBlog)
  const savedBlog = await blogObject.save()

  const savedBlogString = JSON.stringify(savedBlog)
  const blogStringAsJSON = JSON.parse(savedBlogString)

  expect(blogStringAsJSON.id).toBeDefined()
})