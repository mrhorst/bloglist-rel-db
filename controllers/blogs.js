const router = require('express').Router()
const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    req.blog = blog
  } catch (error) {
    next(error)
  }
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.send(blog)
})

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
  }
  res.sendStatus(204) //no content
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.send(req.blog)
  }
})

module.exports = router
