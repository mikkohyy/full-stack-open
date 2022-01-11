const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((sumOfLikes, blog) => {
    return sumOfLikes + blog.likes
  }, 0)
  return totalLikes
}

module.exports =  {
  dummy,
  totalLikes
}