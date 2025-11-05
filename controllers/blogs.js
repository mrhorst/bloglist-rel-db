const router = require('express').Router()
const { Blog } = require('../models')

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
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res, next) => {
  const blog = await Blog.create(req.body)
  res.send(blog)
})

router.delete('/:id', blogFinder, async (req, res, next) => {
  try {
    await req.blog.destroy()
    res.sendStatus(204) //no content
  } catch (error) {
    next(error)
  }
})

router.put('/:id', blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.send(req.blog)
  } catch (error) {
    next(error)
  }
})

module.exports = router
