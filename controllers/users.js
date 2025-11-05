const route = require('express').Router()
const { Blog } = require('../models')
const User = require('../models/user')

route.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send(user)
  } catch (error) {
    next(error)
  }
})

route.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
    })
    res.send(users)
  } catch (error) {
    next(error)
  }
})

route.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    })
    user.username = req.body.username
    await user.save()
    res.send(user)
  } catch (error) {
    next(error)
  }
})

module.exports = route
