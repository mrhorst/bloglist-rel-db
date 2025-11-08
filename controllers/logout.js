const {
  checkTokenValidity,
  tokenExtractor,
} = require('../middleware/authentication')
const Session = require('../models/session')
const Sequelize = require('sequelize')

const route = require('express').Router()

route.post('/', tokenExtractor, checkTokenValidity, async (req, res, next) => {
  const { token_id } = req.decodedToken
  const session = await Session.findOne({
    where: { token_id },
  })
  session.active = false
  session.revokedAt = new Date().toISOString()

  await session.save()

  res.send({ message: 'user logged out successfully' })
})

module.exports = route
