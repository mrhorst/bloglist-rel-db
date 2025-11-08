const router = require('express').Router()
const { Blog, User } = require('../models')

const { Op } = require('sequelize')
const {
  tokenExtractor,
  checkTokenValidity,
} = require('../middleware/authentication')

const blogFinder = async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      req.blog = blog
    } else {
      throw new Error(`could not find blog with id: ${req.params.id}`, {
        cause: 'Invalid blog id',
      })
    }
  } catch (error) {
    next(error)
  }
  next()
}

router.get('/', async (req, res, next) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      { author: { [Op.iLike]: `%${req.query.search}%` } },
      { title: { [Op.iLike]: `%${req.query.search}%` } },
    ]
  }

  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: { exclude: ['id'] },
    },
    where,
    order: [['likes', 'DESC']],
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, checkTokenValidity, async (req, res, next) => {
  const blog = await Blog.create({ ...req.body, userId: req.decodedToken.id })
  res.send(blog)
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res, next) => {
  if (req.decodedToken.id !== req.blog.userId) {
    res.send({
      error: `authenticated user is not owner of this resource. ${req.decodedToken.id} x ${req.blog.userId}`,
    })
  }
  try {
    await req.blog.destroy()
    res.sendStatus(204) //no content
  } catch (error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.send(req.blog)
  } catch (error) {
    next(error)
  }
})

module.exports = router
