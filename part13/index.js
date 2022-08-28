require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    return res.json(blogs)
  } catch (error) {
    return res.status(404).json({error})
  }
});

app.post('/api/blogs', async (req, res) => {
  const newBlog = req.body;
  try {
    const blog = await Blog.create(newBlog)
    return res.json(blog)
  } catch (error) {
    return res.status(400).json({error})
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  const blogId = req.params.id
  try {
    await Blog.destroy({
      where: {
        id: blogId
      }
    })
    return res.status(200).end()
  } catch (error) {
    return res.status(404).json({error})
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})