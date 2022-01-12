const Blog = require('../models/blog')

const listWithManyBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'Better tooling wont fix your API',
    author: 'Swizec Teller',
    url: 'https://swizec.com/blog/better-tooling-wont-fix-your-api/',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    _id: '61dc844a82be32a99cabcaeb',
    title: 'How GraphQL blows REST out of water',
    author: 'Swizec Teller',
    url: 'https://swizec.com/blog/how-graphql-blows-rest-out-of-the-water/',
    likes: 3
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    _id: '61ddd8972d4d44dfc2b13bc4',
    title: 'The quickest way to fail a tech interview',
    author: 'Swizec Teller',
    url: 'https://swizec.com/blog/the-quickest-way-to-fail-a-tech-interview/',
    likes: 2
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  listWithManyBlogs,
  blogsInDb
}