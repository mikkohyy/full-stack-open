const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
// const _ = require('lodash')

beforeEach(async () => {
  await User.deleteMany({})
})

afterAll(() => {
  mongoose.connection.close()
})

describe('POST /api/users request tests', () => {
  test('a new user is created', async() => {
    const usersInDbBeforePostRequest = await helper.getUsersInDb()

    await api
      .post('/api/users')
      .send(helper.individualUser)
      .expect(201)

    const usersInDbAfterPostRequest = await helper.getUsersInDb()
    const usersInDbAfterPostRequestString = JSON.stringify(usersInDbAfterPostRequest)

    expect(usersInDbAfterPostRequest).toHaveLength(usersInDbBeforePostRequest.length+1)
    expect(usersInDbAfterPostRequestString).toContain(helper.individualUser.username)
    expect(usersInDbAfterPostRequestString).toContain(helper.individualUser.name)
    expect(usersInDbAfterPostRequestString).not.toContain(helper.individualUser.password)

  })
})