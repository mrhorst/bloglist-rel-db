const { Blog } = require('../models')
const { sequelize } = require('../util/db')

const route = require('express').Router()

route.get('/', async (req, res, next) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('title')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    group: ['author'],
    order: [['likes', 'DESC']],
  })
  res.send(authors)
})

module.exports = route
