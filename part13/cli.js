const { Blog } = require('./models')

const getAllBlogs = async () => {
  const blogs = await Blog.findAll()
  for (const blog of blogs) {
    console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
  }
}

getAllBlogs()