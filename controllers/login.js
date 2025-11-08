const route = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { User } = require('../models')
const Session = require('../models/session')
const { v4: uuidv4 } = require('uuid')
const { Op } = require('sequelize')

route.post('/', async (req, res, next) => {
  const { username, password } = req.body
  const user = await User.findOne({
    where: {
      username,
      active: { [Op.in]: [true, false] },
    },
  })

  const passwordCorrect = password === 'secret'

  if (!(user && passwordCorrect)) {
    return res.status(401).send({ error: 'invalid username or password' })
  }

  if (!user.active) {
    res.status(403).send({ error: 'user is disabled. contact an admin' })
  }

  const session = await Session.create({
    userId: user.id,
    tokenId: uuidv4(),
    active: true,
  })

  const userForToken = {
    username: user.username,
    id: user.id,
    token_id: session.tokenId,
  }

  const token = jwt.sign(userForToken, SECRET)

  res.send({ token, username: user.username, name: user.name })
})

module.exports = route
