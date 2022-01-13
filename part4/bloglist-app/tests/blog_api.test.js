const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const _ = require('lodash')

beforeEach(async () => {
  await Blog.deleteMany({})
})

afterAll(() => {
  mongoose.connection.close()
})

describe('GET /api/blogs request tests', () => {
  test('all blogs are returned', async () => {
    helper.addMultipleBlogs()
    const response = await api.get('/api/blogs')
    const returnedBlogs = response.body

    expect(returnedBlogs).toHaveLength(helper.listWithManyBlogs.length)
  })
})

describe('POST /api/blogs request tests', () => {
  test('a new blog is created', async () => {
    await helper.addMultipleBlogs()

    const blogsInDbBeforePostRequest = await helper.getBlogsInDb()

    await api
      .post('/api/blogs')
      .send(helper.individualBlog)

    const blogsInDbAfterPostRequest = await helper.getBlogsInDb()
    const blogsInDbAfterPostRequestString = JSON.stringify(blogsInDbAfterPostRequest)

    expect(blogsInDbAfterPostRequest).toHaveLength(blogsInDbBeforePostRequest.length+1)
    expect(blogsInDbAfterPostRequestString).toContain(helper.individualBlog.author)
    expect(blogsInDbAfterPostRequestString).toContain(helper.individualBlog.title)
    expect(blogsInDbAfterPostRequestString).toContain(helper.individualBlog.url)
  })
})

describe('Blog object tests', () => {
  test('a returned blog object has property id', async () => {
    const blogObject = new Blog(helper.individualBlog)
    await blogObject.save()

    const blogs = await helper.getBlogsInDb()
    const addedBlog = _.first(blogs)

    expect(addedBlog.id).toBeDefined()
  })
})
