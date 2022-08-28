const router = require('express').Router()
const { User } = require('../models')
const { hashPassword } = require('../util/utils')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] }
  })
  return res.json(users)
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