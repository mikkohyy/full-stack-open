const router = require('express').Router()
const { User } = require('../models')
const { Blog } = require('../models')
const { hashPassword } = require('../util/utils')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    include: {
      model: Blog,
      attributes: ['id', 'author', 'url', 'title', 'likes']
    }
  })
  return res.json(users)
})

router.get('/:id', async (req, res) => {
  const where = {}

  if (req.query.read) {
    where.read = req.query.read === 'true'
  }

  const foundUser = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
    include: [{
      model: Blog,
      as: 'readings',
      attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
      through: {
        as: 'readingStatus',
        attributes: ['read', 'id'],
        where
      },
    }],
  })
  if (foundUser) {
    res.json(foundUser)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res, next) => {
  const {name, username, password } = req.body
  
  const passwordHash = await hashPassword(password)

  const newUser = {
    name,
    username,
    password: passwordHash
  }

  try {
    const savedUser = await User.create(newUser)
    const { password, ...addedUser } = savedUser.toJSON()
    res.json(addedUser)
  } catch (error) {
    next(error)
  }
})

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    })
    user.username = req.body.username
    await user.save()
    const { password, ...updatedUser } = user.toJSON()
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = router