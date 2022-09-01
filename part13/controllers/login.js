const jwt = require('jsonwebtoken')
const router = require('express').Router()
const bcrypt = require('bcrypt')

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/session')

router.post('/', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(req.body.password, user.password)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  await Session.create({
    user_id: user.id,
    token: token
  })

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router