const router = require('express').Router()
const { 
  blogFinder,
  tokenExtractor,
  tokenGetter,
  sessionChecker } = require('../util/middleware')
const { Op } = require('sequelize')

const { Blog, User, UserBlogs } = require('../models')

router.get('/', async (req, res) => {
  let where = {}
  
  if (req.query.search) {
    where = {
      ...where,
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`
          }
        },
        { 
          author: {
            [Op.iLike]: `%${req.query.search}%`
          }
        }
      ]
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['id', 'name', 'username']
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  })
  return res.json(blogs)
});

router.post('/', tokenExtractor, tokenGetter, sessionChecker, async (req, res, next) => {
  const newBlog = req.body;
  try {
    const userWhoAdded = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...newBlog, userId: userWhoAdded.id})
    return res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.delete(
  '/:id',
  tokenExtractor,
  tokenGetter,
  blogFinder,
  sessionChecker,
  async (req, res) => {
  if (req.blog && req.decodedToken.id === req.blog.userId) {
    UserBlogs.destroy({
      where: { blog_id: req.blog.id}
    })
    await req.blog.destroy()
    res.status(200).end()
  } else {
    res.status(403).end()
  }
})

router.put('/:id', blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.blog.likes + 1
    await req.blog.save()
    res.json(req.blog)
  } catch(error) {
    next(error)
  }
})

module.exports = router