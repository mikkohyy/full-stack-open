const Session = require('../models/session')
const router = require('express').Router()
const { tokenExtractor, tokenGetter } = require('../util/middleware')
const { Op } = require ('sequelize')

router.delete('/', tokenGetter, tokenExtractor, async (req, res, next) => {
  const userId = req.decodedToken.id;
  const token = req.fullToken

  try {
    await Session.destroy({
      where: {
        [Op.and]: [{ user_id: userId, token: token }]
      }
    })
    res.status(202).end()
  } catch (error) {
    next(error)
  } 
})

module.exports = router