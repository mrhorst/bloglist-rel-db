const route = require('express').Router()
const { Blog, ReadingList } = require('../models')
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
      include: [
        {
          model: Blog,
          as: 'blogs',
          attributes: { exclude: ['userId'] },
        },
        {
          model: Blog,
          as: 'readings',
          attributes: { exclude: ['userId'] },
          through: {
            attributes: [],
          },
        },
      ],
    })
    res.send(users)
  } catch (error) {
    next(error)
  }
})

const HIDE_TIMESTAMP = ['createdAt', 'updatedAt']

route.get('/:id', async (req, res, next) => {
  let where = {}

  if (req.query.isRead) {
    where['isRead'] = req.query.isRead
  }
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: HIDE_TIMESTAMP },
      include: [
        {
          model: Blog,
          as: 'readings',
          attributes: { exclude: ['id', 'userId', ...HIDE_TIMESTAMP] },
          through: {
            where,
            attributes: ['isRead', 'id'],
          },
        },
      ],
    })
    res.send(user)
  } catch (error) {
    console.log(error.message)
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
