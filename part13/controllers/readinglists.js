const router = require('express').Router()
const { tokenExtractor, tokenGetter, sessionChecker } = require('../util/middleware')
const { Op } = require('sequelize')

const { UserBlogs } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    await UserBlogs.create(req.body)
    res.status(200).end()
  } catch(error) {
    next(error)
  }
})

router.put(
  '/:id', 
  tokenExtractor,
  tokenGetter,
  sessionChecker,
  async (req, res, next) => {
    const userId = req.decodedToken.id
    const blogId = req.params.id

    const foundReading = await UserBlogs.findOne({
      where: {
        [Op.and]: [
          {
            user_id: userId,
            blog_id: blogId
          }
        ]
      }
    })

    if (foundReading) {
      const updatedReading = await foundReading.update({ read: req.body.read })
      res.send(updatedReading)
    } else {
      res.status(404).end()    
    }
  }
)

module.exports = router