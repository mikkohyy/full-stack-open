const Blog = require('./blog')
const User = require('./user')
const UserBlogs = require('./user_blogs')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: UserBlogs, as: 'blog_readers' })
Blog.belongsToMany(User, { through: UserBlogs, as: 'user_readinglist' })

module.exports = {
  Blog,
  User
}