const Blog = require('./blog')
const User = require('./user')
const UserBlogs = require('./user_blogs')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasMany(Session)
Session.belongsTo(User)

Blog.belongsToMany(User, { through: UserBlogs, as: 'interested_users' })
User.belongsToMany(Blog, { through: UserBlogs, as: 'readings' })

module.exports = {
  Blog,
  User,
  UserBlogs,
  Session
}