const router = require('express').Router()
const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.send(blog)
})

router.delete('/:id', async (req, res) => {
  const blogToDelete = await Blog.findByPk(req.params.id)
  await blogToDelete.destroy()
  res.sendStatus(204) //no content
})

module.exports = router
