const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class UserBlogs extends Model {}

UserBlogs.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' }
  },
  read: {
    type: DataTypes.STRING,
    defaultValue: 'unread',
    isIn: [['unread', 'read']]
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'userBlogs'
})

module.exports = UserBlogs