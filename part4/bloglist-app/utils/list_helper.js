const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const favouriteBlog = (blogs) => {
  let favouriteBlogInfo = {}

  if (blogs.length !== 0) {

    const maxLikes = Math.max(...blogs.map((blog => blog.likes)))
    const blogWithMostLikes = blogs.find(blog => blog.likes === maxLikes)

    favouriteBlogInfo = {
      title: blogWithMostLikes.title,
      author: blogWithMostLikes.author,
      likes: blogWithMostLikes.likes
    }
  }

  return favouriteBlogInfo
}

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((sumOfLikes, blog) => {
    return sumOfLikes + blog.likes
  }, 0)
  return totalLikes
}

module.exports =  {
  dummy,
  favouriteBlog,
  totalLikes
}